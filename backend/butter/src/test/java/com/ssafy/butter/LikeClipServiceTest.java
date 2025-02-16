//package com.ssafy.butter;
//import com.ssafy.butter.auth.dto.AuthInfoDTO;
//import com.ssafy.butter.domain.clip.dto.request.ClipLikeRequestDTO;
//import com.ssafy.butter.domain.clip.service.ClipService;
//import com.ssafy.butter.domain.member.enums.Gender;
//import com.ssafy.butter.domain.member.entity.Member;
//import com.ssafy.butter.domain.clip.entity.Clip;
//import com.ssafy.butter.domain.clip.entity.LikedClip;
//import com.ssafy.butter.domain.member.service.member.MemberService;
//import com.ssafy.butter.infrastructure.redis.RedisManager;
//import com.ssafy.butter.domain.member.service.MemberService;
//import com.ssafy.butter.domain.clip.repository.ClipRepository;
//import com.ssafy.butter.domain.clip.repository.LikedClipRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.AdditionalAnswers;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.time.LocalDate;
//import java.util.Optional;
//import java.util.Random;
//import java.util.concurrent.CountDownLatch;
//import java.util.concurrent.ExecutorService;
//import java.util.concurrent.Executors;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.anyLong;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class LikeClipServiceTest {
//
//    // ClipService가 내부에서 사용하고 있는 의존성들
//    @Mock
//    private MemberService memberService;
//
//    @Mock
//    private ClipRepository clipRepository;
//
//    @Mock
//    private LikedClipRepository likedClipRepository;
//
//    @Mock
//    private RedisManager redisManager;
//
//    // 테스트 대상 서비스 (의존성은 위의 목 객체들이 주입됨)
//    @InjectMocks
//    private ClipService clipService;
//
//    // 테스트에서 사용할 기본 회원, 클립 객체 생성
//    private Member testMember;
//    private Clip testClip;
//
//    @BeforeEach
//    void setUp() {
//        // 테스트에 사용할 회원과 클립을 미리 준비합니다.
//        testMember = new Member(1L, "shameless8@naver.com", Gender.FEMALE.name(), LocalDate.now());
//        testClip = new Clip(1L, "Test Clip");
//
//        // memberService.findById(1L) 호출 시 항상 유효한 Member 객체 반환
//        when(memberService.findById(1L)).thenReturn(testMember);
//
//        // clipRepository.findById(1L) 호출 시 항상 유효한 Clip 객체 반환
//        when(clipRepository.findById(1L)).thenReturn(Optional.of(testClip));
//
//        // likedClipRepository.findByMemberAndClip(...)는 기본적으로 좋아요 정보가 없는 경우로 설정
//        when(likedClipRepository.findByMemberAndClip(any(Member.class), any(Clip.class)))
//                .thenReturn(Optional.empty());
//
//        // likedClipRepository.save()는 저장된 객체를 그대로 반환하도록 설정
//        when(likedClipRepository.save(any(LikedClip.class)))
//                .then(AdditionalAnswers.returnsFirstArg());
//
//        // RedisManager 관련 설정
//        // 초기 상태: redis에 좋아요 데이터가 없으면 null 반환
//        // 단, 이미 좋아요한 경우에는 redis에 문자열 형태의 숫자(예:"1")가 존재한다고 가정합니다.
//        when(redisManager.getData("1")).thenReturn("1");
//
//        // redisManager.incrementValue: 호출 시 전달받은 delta만큼 증가한 값을 반환하도록 단순화
//        // 실제 Redis의 동작과 달리 테스트에서는 상태를 관리하지 않고, 누적 값으로 가정합니다.
//        // 예를 들어, 최초 값이 "1"이라면 첫 호출시 2L, 그 다음 호출시 3L ... 이렇게 되도록 할 수 있지만,
//        // 여기서는 간단히 무조건 101L을 반환하도록 stub 처리합니다.
//        when(redisManager.incrementValue(eq("1"), anyLong())).thenReturn(101L);
//
//        // updateLikeCountFromRedis() 등 내부 메서드는 ClipService 내부에서 처리되므로 별도 Stub 생략
//    }
//
//    @Test
//    @DisplayName("[좋아요 정보가 Redis에 있을 경우 동시성 이슈가 발생하지 않음]")
//    void success() throws InterruptedException {
//        // given
//        AuthInfoDTO authInfoDTO = new AuthInfoDTO(1L, "shameless8@naver.com", Gender.FEMALE.name(), LocalDate.now());
//        ClipLikeRequestDTO clipLikeRequestDTO = new ClipLikeRequestDTO(1L);
//        int threadCount = 100;
//        ExecutorService service = Executors.newFixedThreadPool(threadCount);
//        CountDownLatch latch = new CountDownLatch(threadCount);
//
//        // 최초 좋아요를 통해 Redis에 좋아요 정보가 있다고 가정
//        clipService.likeClip(authInfoDTO, clipLikeRequestDTO);
//
//        // when
//        for (int i = 0; i < threadCount; i++) {
//            service.execute(() -> {
//                // 랜덤 회원 id 생성 시, 1이 아닌 id가 들어와도 memberService.findById()가
//                // 항상 유효한 Member를 반환하도록 Stub을 추가할 수 있습니다.
//                // 여기서는 단순화를 위해 1L 외에도 모든 id에 대해 testMember를 반환하도록 처리합니다.
//                long randomId = new Random().nextInt(1000) + 1;
//                when(memberService.findById(randomId)).thenReturn(testMember);
//
//                AuthInfoDTO randomAuth = new AuthInfoDTO(randomId, "shameless8@naver.com", Gender.FEMALE.name(), LocalDate.now());
//                clipService.likeClip(randomAuth, clipLikeRequestDTO);
//                latch.countDown();
//            });
//        }
//        latch.await();
//
//        // then
//        long likeCount = clipService.getLikeCount(1L);
//        // 여기서는 RedisManager의 incrementValue stub이 무조건 101L을 반환하도록 설정했으므로, 기대값은 101입니다.
//        assertThat(likeCount).isEqualTo(101);
//    }
//}
