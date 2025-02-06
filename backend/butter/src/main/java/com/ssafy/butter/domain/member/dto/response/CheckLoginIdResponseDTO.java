package com.ssafy.butter.domain.member.dto.response;

public record CheckLoginIdResponseDTO(
        boolean exists,
        String message
) {
}
