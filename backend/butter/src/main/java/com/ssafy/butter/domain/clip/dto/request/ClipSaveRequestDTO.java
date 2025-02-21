package com.ssafy.butter.domain.clip.dto.request;

import jakarta.validation.constraints.NotNull;

public record ClipSaveRequestDTO(

        @NotNull
        String title,

        @NotNull
        Long crewId,

        @NotNull
        String videoName,

        @NotNull
        String videoUrl) {
}
