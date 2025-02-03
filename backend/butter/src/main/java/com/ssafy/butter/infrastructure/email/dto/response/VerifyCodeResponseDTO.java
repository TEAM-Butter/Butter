package com.ssafy.butter.infrastructure.email.dto.response;


public record VerifyCodeResponseDTO(
        String message,
        String type,
        String loginId
) {
}
