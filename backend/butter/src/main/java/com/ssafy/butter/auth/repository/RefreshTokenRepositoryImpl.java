package com.ssafy.butter.auth.repository;

import com.ssafy.butter.auth.entity.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepository{
    private final RefreshTokenJpaRepository refreshTokenJpaRepository;

    @Override
    public void deleteAllByMemberId(Long memberId) {
        refreshTokenJpaRepository.deleteAllByMemberId(memberId);
    }

    @Override
    public void save(RefreshToken refreshToken) {
        refreshTokenJpaRepository.save(refreshToken);
    }

    @Override
    public Optional<RefreshToken> findByMemberId(Long memberId) {
        return refreshTokenJpaRepository.findByMemberId(memberId);
    }

    @Override
    public void delete(RefreshToken savedRefreshToken) {
        refreshTokenJpaRepository.delete(savedRefreshToken);
    }
}
