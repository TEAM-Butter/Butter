package com.ssafy.butter.domain.notification.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationType {
    NOTICE("CREW_NOTICE", "/crew/detail/"),
    SCHEDULE("CREW_SCHEDULE", "/crew/detail/"),
    LIVE("LIVE_START", "/stream/");

    private final String alias;
    private final String path;
}
