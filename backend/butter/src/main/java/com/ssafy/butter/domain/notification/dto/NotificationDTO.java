package com.ssafy.butter.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationDTO {

    private Long id;
    private String crewImageUrl;
    private String crewName;
    private String content;
    private Long receiver;
    private String url;
    private String notificationType;
}
