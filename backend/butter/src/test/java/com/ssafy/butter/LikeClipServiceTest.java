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

    // CrewService는 이 테스트에서 사용되지 않으므로 간단하게 목 처리
    @Mock
    private com.ssafy.butter.domain.crew.service.CrewService crewService;

    @InjectMocks
    private ClipServiceImpl clipService;

    @Test
    @DisplayName("동시에 1000명이 좋아요를 누르면 좋아요 카운트가 1000개가 되어야 한다")
    public void concurrentLikeClip_shouldIncrementRedisCountTo1000() throws InterruptedException {
        // 테스트할 클립 ID
        Long clipId = 1L;

        // Redis 동작을 시뮬레이션하기 위해 AtomicLong 사용 (초기 값 0)
        AtomicLong redisCounter = new AtomicLong(0);

        // redisManager.getData("1")는 매번 redisCounter의 현재 값을 문자열로 반환하도록 설정
        when(redisManager.getData(eq(String.valueOf(clipId))))
                .thenAnswer(invocation -> String.valueOf(redisCounter.get()));

        // redisManager.incrementValue("1", 1) 호출 시, redisCounter에 1을 더한 값을 반환
        when(redisManager.incrementValue(eq(String.valueOf(clipId)), eq(1L)))
                .thenAnswer(invocation -> {
                    Long delta = invocation.getArgument(1);
                    return redisCounter.addAndGet(delta);
                });

        // clipRepository.findById(clipId)는 테스트용 Clip 객체를 반환
        Clip testClip = Clip.builder().build();
        when(clipRepository.findById(eq(clipId)))
                .thenReturn(Optional.of(testClip));

        // likedClipRepository.findByMemberAndClip(...)는 좋아요 기록이 없다고 가정
        when(likedClipRepository.findByMemberAndClip(any(Member.class), any(Clip.class)))
                .thenReturn(Optional.empty());
        // 좋아요 기록 저장은 입력 받은 객체를 그대로 반환
        when(likedClipRepository.save(any(LikedClip.class)))
                .then(AdditionalAnswers.returnsFirstArg());

        // memberService.findById(...)는 호출된 id에 따라 새로운 Member 객체를 반환 (id 설정)
        when(memberService.findById(anyLong()))
                .thenAnswer(invocation -> {
                    Long id = invocation.getArgument(0);
                    Member member = Member.builder().id(id).build();
                    return member;
                });

        // 좋아요 요청 DTO (클립 id 1)
        ClipLikeRequestDTO likeRequest = new ClipLikeRequestDTO(clipId);

        // 동시에 1000명의 사용자가 좋아요 요청을 보내는 상황을 시뮬레이션
        int threadCount = 1000;
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

        // 최종 좋아요 카운트는 Redis에 저장된 값 (redisCounter의 값)이어야 하며, 20가 되어야 함
        long finalCount = clipService.getLikeCount(clipId);
        assertThat(finalCount)
                .as("동시에 1000명이 좋아요 누르면 최종 카운트가 20이어야 한다")
                .isEqualTo(1000L);
    }
}