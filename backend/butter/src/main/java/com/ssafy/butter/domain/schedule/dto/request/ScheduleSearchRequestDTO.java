package com.ssafy.butter.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ScheduleSearchRequestDTO(

        Long scheduleId,

        @NotNull
        Integer pageSize,
        String keyword,
        LocalDate date,
        Double latitude,
        Double longitude,

        @NotNull
        String sortBy
) {
}
