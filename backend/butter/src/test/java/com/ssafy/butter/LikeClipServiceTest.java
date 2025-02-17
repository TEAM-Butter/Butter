package com.ssafy.butter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipLikeRequestDTO;
import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.clip.entity.LikedClip;
import com.ssafy.butter.domain.clip.repository.ClipRepository;
import com.ssafy.butter.domain.clip.repository.LikedClipRepository;
import com.ssafy.butter.domain.clip.service.ClipServiceImpl;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.infrastructure.redis.RedisManager;
import java.time.LocalDate;
import java.util.Optional;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

// 단위 테스트에서는 Spring Boot의 의존성(데이터 JPA, Redis 등)을 목(mock)으로 대체하여 테스트합니다.
@ExtendWith(MockitoExtension.class)
public class LikeClipServiceTest {

    @Mock
    private MemberService memberService;

    @Mock
    private ClipRepository clipRepository;

    @Mock
    private LikedClipRepository likedClipRepository;

    @Mock
    private RedisManager redisManager;

    // 테스트에서 사용하지 않는 CrewService는 간단히 목 처리
    @Mock
    private com.ssafy.butter.domain.crew.service.CrewService crewService;

    @InjectMocks
    private ClipServiceImpl clipService;

    @Test
    @DisplayName("동시에 20명이 좋아요를 누르면 Redis의 좋아요 카운트가 20이 되어야 한다")
    public void concurrentLikeClip_shouldIncrementRedisCountTo20() throws InterruptedException {
        // 테스트할 클립 ID 설정
        Long clipId = 1L;

        // 테스트용 Clip 인스턴스 생성 및 id 설정
        Clip testClip = Clip.builder().id(clipId).build();
        // 테스트 코드에서는 setter나 직접 필드 접근을 통해 id를 지정합니다.
        // (필요하다면 Reflection을 사용할 수 있음)

        // Redis 동작을 시뮬레이션하기 위해 AtomicLong 사용 (초기 값 0)
        AtomicLong redisCounter = new AtomicLong(0);

        // redisManager.getData("1") 호출 시, 현재 redisCounter의 값을 문자열로 반환
        when(redisManager.getData(eq(String.valueOf(clipId))))
                .thenAnswer(invocation -> String.valueOf(redisCounter.get()));

        // redisManager.incrementValue("1", 1) 호출 시, redisCounter에 1을 더하고 그 결과를 반환
        when(redisManager.incrementValue(eq(String.valueOf(clipId)), eq(1L)))
                .thenAnswer(invocation -> {
                    long delta = invocation.getArgument(1);
                    return redisCounter.addAndGet(delta);
                });

        // clipRepository.findById(clipId)는 테스트용 Clip을 반환
        when(clipRepository.findById(eq(clipId)))
                .thenReturn(Optional.of(testClip));

        // likedClipRepository.findByMemberAndClip(...)는 항상 좋아요 기록이 없다고 가정하여 새로운 기록이 생성되도록 함
        when(likedClipRepository.findByMemberAndClip(any(Member.class), any(Clip.class)))
                .thenReturn(Optional.empty());
        // likedClipRepository.save(...)는 전달받은 객체를 그대로 반환하도록 stub 처리
        when(likedClipRepository.save(any(LikedClip.class)))
                .then(AdditionalAnswers.returnsFirstArg());

        // memberService.findById(...)는 호출된 회원 id에 따라 새로운 Member 객체를 생성해 반환
        when(memberService.findById(anyLong()))
                .thenAnswer(invocation -> {
                    Long memberId = invocation.getArgument(0);
                    return Member.builder().id(memberId).build();
                });

        // 좋아요 요청 DTO (clip id: 1)
        ClipLikeRequestDTO likeRequest = new ClipLikeRequestDTO(clipId);

        // 동시에 20명의 사용자가 좋아요 요청을 보내는 상황을 시뮬레이션
        int threadCount = 20;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(threadCount);

        // 각 스레드는 서로 다른 회원으로 처리 (회원 id: 100 ~ 119)
        for (int i = 0; i < threadCount; i++) {
            long memberId = 100L + i;
            AuthInfoDTO authInfo = new AuthInfoDTO(memberId, "user" + memberId + "@example.com", "MALE", LocalDate.now());
            executor.submit(() -> {
                clipService.likeClip(authInfo, likeRequest);
                latch.countDown();
            });
        }
        latch.await();
        executor.shutdown();

        // 최종 좋아요 카운트는 clipService.getLikeCount(Clip) 메소드를 통해 조회 (내부적으로 Redis에서 조회)
        long finalLikeCount = clipService.getLikeCount(testClip);
        assertThat(finalLikeCount)
                .as("동시에 20명의 좋아요 요청이 들어오면, 최종 좋아요 카운트는 20이어야 한다")
                .isEqualTo(20L);
    }
}
