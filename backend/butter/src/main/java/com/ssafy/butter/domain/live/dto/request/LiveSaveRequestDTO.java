package com.ssafy.butter.domain.live.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record LiveSaveRequestDTO(

        @NotNull
        Long crewId,

        @NotNull
        String title,
        Long scheduleId
) {
}
