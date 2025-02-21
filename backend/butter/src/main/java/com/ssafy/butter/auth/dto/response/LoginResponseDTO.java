package com.ssafy.butter.auth.dto.response;

public record LoginResponseDTO(
        String accessToken,
        String refreshToken,
        AuthenticatedMemberInfoDTO authenticatedMemberInfo
) {
}
