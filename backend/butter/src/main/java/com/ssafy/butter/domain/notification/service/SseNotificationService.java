package com.ssafy.butter.domain.notification.service;

import static io.lettuce.core.RedisURI.DEFAULT_TIMEOUT;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.notification.dto.NotificationDTO;
import com.ssafy.butter.domain.notification.repository.NotificationRepository;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class SseNotificationService implements NotificationService{

    private final NotificationRepository notificationRepository;
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    @Override
    public SseEmitter subscribe(Long userId, String lastEventId) {
        String id = userId + "_" + System.currentTimeMillis();

        SseEmitter emitter = notificationRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        emitter.onCompletion(() -> notificationRepository.deleteEmitterById(id));
        emitter.onTimeout(() -> notificationRepository.deleteEmitterById(id));

        emitEventToClient(emitter, id, "실시간 알림 이벤트 스트림 생성. [userId=" + userId + "]");

        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = notificationRepository.findAllEventCacheStartsWithMemberId(userId);
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> emitEventToClient(emitter, entry.getKey(), entry.getValue()));
        }

        return emitter;
    }

    @Override
    public void sendNotificationToFollowers(Crew crew, String notificationContent, String notificationType,
                                            String url) {
        List<Follow> follows = crew.getFollows();

        for(Follow follow : follows){
            if(follow.getIsFollowed()){
                Member member = follow.getMember();
                send(member.getId(), notificationContent, notificationType, url);
            }
        }
    }

    @Override
    public void send(Long receiver, String content, String type, String url) {
        NotificationDTO notification = createNotification(receiver, content, type, url);

        Map<String, SseEmitter> sseEmitterMap = notificationRepository.findAllEmitterStartsWithMemberId(receiver);
        sseEmitterMap.forEach(
                (key, sseEmitter) -> {
                    notificationRepository.saveEventCache(key, notification); // 이벤트 캐시 저장
                    emitEventToClient(sseEmitter, key, notification); // 이벤트 전송
                }
        );
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
        } catch (IOException exception) {
            notificationRepository.deleteEmitterById(emitterId);
            sseEmitter.completeWithError(exception);
        }
    }
}
