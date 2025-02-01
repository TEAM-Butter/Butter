package com.ssafy.butter.auth.dto.response;

import com.ssafy.butter.auth.dto.AuthInfoDTO;

public record AuthResponseDTO(
        String accessToken,
        String refreshToken,
        AuthInfoDTO authInfoDTO
) {
}
