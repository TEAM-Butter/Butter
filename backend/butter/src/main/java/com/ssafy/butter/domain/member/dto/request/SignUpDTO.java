package com.ssafy.butter.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record SignUpDTO(
        @NotNull
        @Size(min = 3, max = 50)
        String loginId,

        String nickname,
        String email,
        String phoneNumber,
        LocalDate birthDate,

        @NotNull
        @Size(min = 8, max = 20)
        String password,

        @NotNull
        Integer gender
) {
}
