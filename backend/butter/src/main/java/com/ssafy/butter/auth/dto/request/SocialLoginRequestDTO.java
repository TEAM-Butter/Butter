package com.ssafy.butter.auth.dto.request;

import com.ssafy.butter.auth.enums.Platform;

public record SocialLoginRequestDTO(String code, String platform) {
    public SocialLoginRequestDTO {
        if (!isValidPlatform(platform)) {
            throw new IllegalArgumentException("ERR : platform" + "은 유효하지 않은 로그인 플랫폼입니다");
        }
    }

    private static boolean isValidPlatform(String platform) {
        if (platform == null || platform.isEmpty()) {
            return false;
        }
        try {
            Platform.valueOf(platform.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}

