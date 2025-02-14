package com.ssafy.butter.domain.notification.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationType {
    NOTICE("공지", "/notices/"),
    SCHEDULE("일정", "/schedules/"),
    LIVE("라이브", "/lives/");

    private final String alias;
    private final String path;
}
