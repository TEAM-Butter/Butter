package com.ssafy.butter.domain.member.dto.response;

public record CheckNickNameDuplicationResponseDTO(
        boolean exists,
        String message
) {
}
