package com.ssafy.butter.domain.clip.dto.request;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record ClipSaveRequestDTO(

        @NotNull
        String title,

        @NotNull
        Long liveId,

        @NotNull
        MultipartFile video) {
}
