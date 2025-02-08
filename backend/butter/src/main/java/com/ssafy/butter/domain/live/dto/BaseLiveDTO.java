package com.ssafy.butter.domain.live.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Getter
public class BaseLiveDTO {

    private final Long id;
    private final String title;
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;
}
