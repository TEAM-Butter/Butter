package com.ssafy.butter.infrastructure.email.dto.response;

public record EmailWithAuthCodeDTO(
        String email,
        String authCode
) {
}
