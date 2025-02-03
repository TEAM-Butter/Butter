package com.ssafy.butter.auth.service;

public interface RefreshTokenService {
    void saveToken(String token, Long memberId);
    void deleteToken(Long memberId);
    void matches(String refreshToken, Long memberId);
}
