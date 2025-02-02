package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record CrewSaveRequestDTO(

        @NotNull
        String name,

        @NotNull
        String description,
        MultipartFile image,
        String promotionUrl,

        @NotNull
        MultipartFile portfolioVideo
) {
}
