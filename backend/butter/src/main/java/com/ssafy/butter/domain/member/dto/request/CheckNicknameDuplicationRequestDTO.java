package com.ssafy.butter.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CheckNicknameDuplicationRequestDTO(
        @NotNull
        @Size(min = 2, max = 50)
        String nickname
) {
}
