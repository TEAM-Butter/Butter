package com.ssafy.butter.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CheckLoginIdDTO(
        @NotNull
        @Size(min = 3, max = 50)
        String loginId
) {
}
