package com.ssafy.butter.auth.repository;

import com.ssafy.butter.auth.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository {
    void deleteAllByMemberId(Long memberId);
    void save(RefreshToken refreshToken);
    Optional<RefreshToken> findByMemberId(Long memberId);
    void delete(RefreshToken savedRefreshToken);
}
