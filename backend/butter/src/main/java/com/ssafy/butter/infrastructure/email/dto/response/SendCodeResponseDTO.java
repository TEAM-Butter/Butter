package com.ssafy.butter.infrastructure.email.dto.response;

public record SendCodeResponseDTO(
        String message,
        String code
) {
}
