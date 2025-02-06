package com.ssafy.butter.auth.dto.response;

import com.ssafy.butter.auth.dto.AuthInfoDTO;

public record ReissueResponseDTO(
        String accessToken,
        AuthInfoDTO authInfoDTO
) {
}
