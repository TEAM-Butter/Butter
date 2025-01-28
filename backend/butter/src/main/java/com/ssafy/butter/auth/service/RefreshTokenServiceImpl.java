package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.entity.RefreshToken;
import com.ssafy.butter.auth.repository.RefreshTokenRepository;
import com.ssafy.butter.global.token.JwtManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService{
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtManager jwtManager;

    @Override
    public void saveToken(String token, Long memberId) {
        deleteToken(memberId);

        refreshTokenRepository.save(RefreshToken.builder()
                .memberId(memberId)
                .token(token)
                .build());
    }

    @Override
    public void deleteToken(Long memberId) {
        refreshTokenRepository.deleteAllByMemberId(memberId);
    }

    @Override
    @Transactional
    public void matches(String refreshToken, Long memberId) {
        RefreshToken savedRefreshToken = refreshTokenRepository.findByMemberId(memberId)
                .orElseThrow(IllegalArgumentException::new);

        if(!jwtManager.isValid(savedRefreshToken.getToken())){
            refreshTokenRepository.delete(savedRefreshToken);
            throw new IllegalArgumentException();
        }

        savedRefreshToken.validateSameRefreshToken(refreshToken);
    }
}
