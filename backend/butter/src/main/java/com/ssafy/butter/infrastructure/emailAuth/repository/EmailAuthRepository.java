package com.ssafy.butter.infrastructure.emailAuth.repository;

import com.ssafy.butter.infrastructure.emailAuth.entity.EmailAuth;
import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailAuthRepository {

    Optional<EmailAuth> findByEmailAndAuthCode(String email, String verifyCode);

    void deleteByExpireDateTimeBefore(LocalDateTime now);

    void save(EmailAuth emailAuth);
}
