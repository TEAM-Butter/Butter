package com.ssafy.butter.auth.dto.request;

public record LoginRequestDTO(
        String loginId,
        String password
) {
}
