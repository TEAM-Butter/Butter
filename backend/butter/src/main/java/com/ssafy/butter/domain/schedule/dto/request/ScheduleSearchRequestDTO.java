package com.ssafy.butter.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ScheduleSearchRequestDTO(

        String keyword,
        LocalDate date
) {
}
