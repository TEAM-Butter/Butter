package com.ssafy.butter.domain.schedule.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Getter
public class BaseScheduleDTO {

    private final Long id;
    private final String title;
    private final String content;
    private final String place;
    private final LocalDateTime buskingDate;
    private final Double latitude;
    private final Double longitude;
    private final LocalDateTime createDate;
    private final LocalDateTime updateDate;
}
