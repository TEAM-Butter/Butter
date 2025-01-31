package com.ssafy.butter.auth.repository;

import com.ssafy.butter.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenJpaRepository extends JpaRepository<RefreshToken, Long> {
    void deleteAllByMemberId(Long memberId);
    Optional<RefreshToken> findByMemberId(Long memberId);
}
