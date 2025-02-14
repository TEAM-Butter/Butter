package com.ssafy.butter.domain.notification.service;

import com.ssafy.butter.domain.crew.entity.Crew;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
    SseEmitter subscribe(Long userId, String lastEventId);
    void sendNotificationToFollowers(Crew crew, String notificationContent, String notificationType, String url);
    void send(Long receiver, String content, String type, String url);
}
