package com.ssafy.butter.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;

public record PasswordUpdateRequestDTO(

        @NotNull
        String currentPassword,

        @NotNull
        String newPassword
) {
}
