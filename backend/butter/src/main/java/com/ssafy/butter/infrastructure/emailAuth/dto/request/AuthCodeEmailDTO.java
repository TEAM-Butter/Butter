package com.ssafy.butter.infrastructure.emailAuth.dto.request;

import jakarta.validation.constraints.Pattern;

public record AuthCodeEmailDTO(
        @Pattern(regexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", message = "ERR : 올바른 이메일 형식이 아닙니다.")
        String email,
        String authCode
) {
}
