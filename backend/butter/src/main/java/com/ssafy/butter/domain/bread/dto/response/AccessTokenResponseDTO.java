package com.ssafy.butter.domain.bread.dto.response;

public record AccessTokenResponseDTO(
        String access_token,
        long expired_at,
        long now
) {}
