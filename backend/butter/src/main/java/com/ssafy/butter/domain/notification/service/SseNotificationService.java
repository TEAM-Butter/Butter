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
                emitter.send(SseEmitter.event()
                        .name("heartbeat")
                        .data("keep-alive"));
            } catch (IOException e) {
                emitter.completeWithError(e);
                scheduler.shutdown();
            }
        }, 0, 30, TimeUnit.SECONDS);
        emitter.onCompletion(scheduler::shutdown);
        emitter.onTimeout(scheduler::shutdown);

        log.info("구독자 연결됨: userId={}, emitterId={}", userId, id);
        emitEventToClient(emitter, id, "실시간 알림 이벤트 스트림 생성됨. [userId=" + userId + "]");

        // 재접속 시 캐시된 이벤트 재전송 처리
        Map<String, Object> events = notificationRepository.findAllEventCacheStartsWithMemberId(userId);
        log.info("재접속 시 캐시된 이벤트 처리 시작: Last-Event-ID = {}", lastEventId);
        log.info("전체 캐시 내용: {}", events);
        log.info("발견된 캐시 이벤트 수: {}", events.size());

        if (lastEventId.isEmpty()) {
            // Last-Event-ID가 비어있으면 모든 캐시된 이벤트를 재전송합니다.
            events.forEach((key, event) -> {
                log.info("재전송할 이벤트(LastEventId 없음): emitterId={}, 이벤트 데이터={}", key, event);
                emitEventToClient(emitter, key, event);
                // 전송 후 이벤트 캐시에서 삭제
                notificationRepository.deleteEventCacheById(key);
            });
        } else {
            // Last-Event-ID 이후의 이벤트만 필터링해서 재전송합니다.
            events.entrySet().stream()
                    .filter(entry -> {
                        boolean isAfter = lastEventId.compareTo(entry.getKey()) < 0;
                        log.info("이벤트 키 [{}] 비교: Last-Event-ID({}) < eventKey({}) => {}",
                                entry.getKey(), lastEventId, entry.getKey(), isAfter);
                        return isAfter;
                    })
                    .forEach(entry -> {
                        log.info("재전송할 이벤트: emitterId={}, 이벤트 데이터={}", entry.getKey(), entry.getValue());
                        emitEventToClient(emitter, entry.getKey(), entry.getValue());
                        // 전송 후 이벤트 캐시에서 삭제
                        notificationRepository.deleteEventCacheById(entry.getKey());
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
                send(crew, member.getId(), notificationContent, notificationType, url);
            }
        }
    }

    @Override
    public void send(Crew crew, Long receiver, String content, String type, String url) {
        log.info("send() 호출됨: 수신자(id={}), 내용='{}', 타입='{}', URL='{}'", receiver, content, type, url);
        NotificationDTO notification = createNotification(crew, receiver, content, type, url);

        // 해당 사용자에 연결된 모든 emitter 가져오기
        Map<String, SseEmitter> sseEmitterMap = notificationRepository.findAllEmitterStartsWithMemberId(receiver);
        if (sseEmitterMap.isEmpty()) {
            // 현재 연결된 emitter가 없으므로, 오프라인 상태로 이벤트 캐시에 저장
            String eventKey = receiver + "_" + System.currentTimeMillis();
            notificationRepository.saveEventCache(eventKey, notification);
            log.info("수신자 {}(오프라인 상태): 이벤트 캐시에 저장됨: key={}, notification={}", receiver, eventKey, notification.toString());
        } else {
            log.info("수신자(id={})에 대해 {}개의 emitter 발견됨", receiver, sseEmitterMap.size());
            sseEmitterMap.forEach((key, sseEmitter) -> {
                log.info("emitter(id={})에 이벤트 전송", key);
                // emitter가 있으면 이벤트 캐시에 저장하고 즉시 전송
                notificationRepository.saveEventCache(key, notification);
                log.info("이벤트 캐시에 저장됨: key={}, notification={}", key, notification.toString());
                emitEventToClient(sseEmitter, key, notification);
            });
        }
    }

    private NotificationDTO createNotification(Crew crew, Long receiver, String content, String type, String url) {
        return NotificationDTO.builder()
                .crewName(crew.getName())
                .crewImageUrl(crew.getImageUrl())
                .receiver(receiver)
                .content(content)
                .notificationType(type)
                .url(url)
                .build();
    }

    private void emitEventToClient(SseEmitter sseEmitter, String emitterId, Object data) {
        try {
            sseEmitter.send(SseEmitter.event()
                    .id(emitterId)
                    .name("sse")
                    .data(data, MediaType.APPLICATION_JSON));
            log.info("emitter(id={})에 대해 이벤트 전송 성공, 데이터={}", emitterId, data);
        } catch (Exception exception) {
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
