package com.ssafy.butter.domain.notification.service;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.notification.dto.NotificationDTO;
import com.ssafy.butter.domain.notification.repository.NotificationRepository;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
@Slf4j
public class SseNotificationService implements NotificationService {

    private final NotificationRepository notificationRepository;
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    @Override
    public SseEmitter subscribe(Long userId, String lastEventId) {
        String id = userId + "_" + System.currentTimeMillis();

        SseEmitter emitter = notificationRepository.save(id, new SseEmitter(Long.MAX_VALUE));

        emitter.onCompletion(() -> {
            notificationRepository.deleteEmitterById(id);
            log.info("Emitter {}가 userId {}에 대해 완료되었습니다.", id, userId);
        });
        emitter.onTimeout(() -> {
            notificationRepository.deleteEmitterById(id);
            log.info("Emitter {}가 userId {}에 대해 타임아웃되었습니다.", id, userId);
        });

        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            try {
                // heartbeat 이벤트 전송
                emitter.send(SseEmitter.event()
                        .name("heartbeat")
                        .data("keep-alive"));
            } catch (IOException e) {
                // 전송 실패 시 emitter 종료 및 scheduler 종료
                emitter.completeWithError(e);
                scheduler.shutdown();
            }
        }, 0, 30, TimeUnit.SECONDS); // 30초마다 heartbeat 전송

        // emitter가 종료되면 scheduler도 종료되도록 설정
        emitter.onCompletion(scheduler::shutdown);
        emitter.onTimeout(scheduler::shutdown);

        log.info("구독자 연결됨: userId={}, emitterId={}", userId, id);
        emitEventToClient(emitter, id, "실시간 알림 이벤트 스트림 생성됨. [userId=" + userId + "]");

        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = notificationRepository.findAllEventCacheStartsWithMemberId(userId);
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> {
                        log.info("캐시된 이벤트 재전송: emitterId={}, 이벤트 데이터={}", entry.getKey(), entry.getValue());
                        emitEventToClient(emitter, entry.getKey(), entry.getValue());
                    });
        }

        return emitter;
    }

    @Override
    public void sendNotificationToFollowers(Crew crew, String notificationContent, String notificationType, String url) {
        List<Follow> follows = crew.getFollows();
        log.info("크루(id={})의 {}명의 팔로워에게 알림 전송 시작", crew.getId(), follows.size());

        for (Follow follow : follows) {
            if (follow.getIsFollowed()) {
                Member member = follow.getMember();
                log.info("멤버(id={})에게 알림 전송", member.getId());
                send(member.getId(), notificationContent, notificationType, url);
            }
        }
    }

    @Override
    public void send(Long receiver, String content, String type, String url) {
        log.info("send() 호출됨: 수신자(id={}), 내용='{}', 타입='{}', URL='{}'", receiver, content, type, url);
        NotificationDTO notification = createNotification(receiver, content, type, url);

        Map<String, SseEmitter> sseEmitterMap = notificationRepository.findAllEmitterStartsWithMemberId(receiver);
        log.info("수신자(id={})에 대해 {}개의 emitter 발견됨", receiver, sseEmitterMap.size());
        sseEmitterMap.forEach((key, sseEmitter) -> {
            log.info("emitter(id={})에 이벤트 전송", key);
            notificationRepository.saveEventCache(key, notification); // 이벤트 캐시 저장
            emitEventToClient(sseEmitter, key, notification); // 이벤트 전송
        });
    }

    private NotificationDTO createNotification(Long receiver, String content, String type, String url) {
        return NotificationDTO.builder()
                .receiver(receiver)
                .content(content)
                .notificationType(type)
                .url(url)
                .readYn('N')
                .deletedYn('N')
                .build();
    }

    private void emitEventToClient(SseEmitter sseEmitter, String emitterId, Object data) {
        try {
            sseEmitter.send(SseEmitter.event()
                    .id(emitterId)
                    .name("sse")
                    .data(data, MediaType.APPLICATION_JSON));
            log.info("emitter(id={})에 대해 이벤트 전송 성공, 데이터={}", emitterId, data);
        } catch (Exception exception) { // IOException 뿐 아니라 모든 예외 처리
            log.error("emitter(id={})에 이벤트 전송 중 오류 발생: {}", emitterId, exception.getMessage(), exception);
            notificationRepository.deleteEmitterById(emitterId);
            try {
                sseEmitter.completeWithError(exception);
            } catch (Exception ex) {
                log.error("emitter(id={}) 완료 처리 중 추가 오류 발생: {}", emitterId, ex.getMessage(), ex);
            }
        }
    }

}
