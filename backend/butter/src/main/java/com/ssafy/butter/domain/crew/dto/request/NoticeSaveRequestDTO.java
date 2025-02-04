package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record NoticeSaveRequestDTO(

        @NotNull
        Long crewId,

        @NotNull
        String title,

        @NotNull
        String content,
        MultipartFile image
) {
}
