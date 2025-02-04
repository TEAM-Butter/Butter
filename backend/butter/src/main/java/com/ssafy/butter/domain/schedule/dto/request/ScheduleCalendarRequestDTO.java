package com.ssafy.butter.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ScheduleCalendarRequestDTO(

        @NotNull
        LocalDateTime buskingDate) {
}
