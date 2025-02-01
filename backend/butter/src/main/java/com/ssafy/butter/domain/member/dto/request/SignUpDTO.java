package com.ssafy.butter.domain.member.dto.request;

import com.ssafy.butter.domain.member.vo.Password;
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
        Password password,

        @NotNull
        String gender,

        String imageUrl
) {
}
