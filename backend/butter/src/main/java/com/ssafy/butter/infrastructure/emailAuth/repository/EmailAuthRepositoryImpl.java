package com.ssafy.butter.infrastructure.emailAuth.repository;

import com.ssafy.butter.infrastructure.emailAuth.entity.EmailAuth;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmailAuthRepositoryImpl implements EmailAuthRepository {

    private final EmailAuthJpaRepository emailAuthJpaRepository;

    @Override
    public Optional<EmailAuth> findByEmailAndAuthCode(String email, String verifyCode) {
        return emailAuthJpaRepository.findByEmailAndVerifyCode(email, verifyCode);
    }

    @Override
    public void deleteByExpireDateTimeBefore(LocalDateTime now) {
        emailAuthJpaRepository.deleteByExpireDateTimeBefore(now);
    }

    @Override
    public void save(EmailAuth emailAuth) {
        emailAuthJpaRepository.save(emailAuth);
    }
}
