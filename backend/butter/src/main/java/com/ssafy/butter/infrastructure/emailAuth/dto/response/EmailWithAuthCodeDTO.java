package com.ssafy.butter.infrastructure.emailAuth.dto.response;

public record EmailWithAuthCodeDTO(
        String email,
        String authCode
) {
}
