package com.ssafy.butter.domain.notification.dto;

import com.ssafy.butter.domain.notification.entity.Notification;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationDTO {

    private Long id;
    private String content;
    private Long memberId;
    private String url;
    private String notificationType;
    private char readYn;
    private char deletedYn;

    public static NotificationDTO fromEntity(Notification notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .content(notification.getContent())
                .memberId(notification.getMember().getId())
                .url(notification.getUrl())
                .notificationType(notification.getNotificationType())
                .readYn(notification.getReadYn())
                .deletedYn(notification.getDeletedYn())
                .build();
    }
}
