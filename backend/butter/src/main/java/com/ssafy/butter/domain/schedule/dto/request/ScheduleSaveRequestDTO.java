package com.ssafy.butter.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ScheduleSaveRequestDTO(

        @NotNull
        Long crewId,

        @NotNull
        LocalDateTime buskingDate,

        @NotNull
        String title,

        @NotNull
        String content,

        @NotNull
        String place,

        @NotNull
        Double latitude,

        @NotNull
        Double longitude
) {
}
