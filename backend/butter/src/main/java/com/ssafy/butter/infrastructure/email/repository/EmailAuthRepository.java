package com.ssafy.butter.infrastructure.email.repository;

import com.ssafy.butter.infrastructure.email.entity.EmailAuth;
import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailAuthRepository {
    Optional<EmailAuth> findByEmail(String email);

    Optional<EmailAuth> findByEmailAndAuthCode(String email, String verifyCode);

    void deleteByExpireDateTimeBefore(LocalDateTime now);

    void save(EmailAuth emailAuth);
}
