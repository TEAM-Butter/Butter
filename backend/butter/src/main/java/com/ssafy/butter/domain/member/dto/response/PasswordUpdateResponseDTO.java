package com.ssafy.butter.domain.member.dto.response;

public record PasswordUpdateResponseDTO(
        String accessToken,
        String refreshToken
) {
}
