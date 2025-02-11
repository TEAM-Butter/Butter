package com.ssafy.butter.domain.notification.service;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.notification.entity.Notification;
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

    @Override
    public void sendNotificationToFollowers(Crew crew, String notificationContent, String notificationType,
                                            String url) {
        List<Follow> follows = crew.getFollows();

        for(Follow follow : follows){
            if(follow.getIsFollowed()){
                Member member = follow.getMember();
                send(member.getNickname().getValue(), notificationContent, notificationType, url);
            }
        }
    }

    @Override
    public void send(String receiver, String content, String type, String url) {
        Notification notification = createNotification(receiver, content, type, url);

        Map<String, SseEmitter> sseEmitterMap = notificationRepository.findAllEmitterStartsWithUsername(receiver);
        sseEmitterMap.forEach(
                (key, sseEmitter) -> {
                    notificationRepository.saveEventCache(key, notification); // 이벤트 캐시 저장
                    emitEventToClient(sseEmitter, key, notification); // 이벤트 전송
                }
        );
    }

    private Notification createNotification(String receiver, String content, String type, String url) {
        return Notification.builder()
                //.receiver(receiver)
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
