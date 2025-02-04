package com.ssafy.butter.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;

public record ScheduleLikeRequestDTO(

        @NotNull
        Long scheduleId
) {
}
