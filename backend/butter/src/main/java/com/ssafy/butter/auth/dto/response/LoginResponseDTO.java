package com.ssafy.butter.auth.dto.response;

import com.ssafy.butter.domain.member.dto.response.RegisterExtraInfoResponseDTO;

public record LoginResponseDTO(
        String accessToken,
        String refreshToken,
        RegisterExtraInfoResponseDTO extraInfo
) {
}
