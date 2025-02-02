package com.ssafy.butter.infrastructure.email.dto.request;

import com.ssafy.butter.infrastructure.email.enums.EmailType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record SendEmailDTO(

        @Pattern(regexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", message = "올바른 이메일 형식이 아닙니다.")
        String email,

        @NotNull
        EmailType type
) {
}
