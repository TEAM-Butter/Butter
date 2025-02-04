package com.ssafy.butter.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record SignUpDTO(
        @NotNull
        @Size(min = 3, max = 50)
        String loginId,

        @NotNull
        String email,

        @NotNull
        LocalDate birthDate,

        @NotNull
        String password,

        @NotNull
        String gender
) {
}
