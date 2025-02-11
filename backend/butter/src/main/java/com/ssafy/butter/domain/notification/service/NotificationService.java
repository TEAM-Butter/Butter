package com.ssafy.butter.domain.notification.service;

import com.ssafy.butter.domain.crew.entity.Crew;

public interface NotificationService {
    void sendNotificationToFollowers(Crew crew, String notificationContent, String notificationType, String url);
    void send(String receiver, String content, String type, String url);
}
