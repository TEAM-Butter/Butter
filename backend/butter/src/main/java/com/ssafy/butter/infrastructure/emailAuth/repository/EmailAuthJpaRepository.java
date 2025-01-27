package com.ssafy.butter.infrastructure.emailAuth.repository;

import com.ssafy.butter.infrastructure.emailAuth.entity.EmailAuth;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailAuthJpaRepository extends JpaRepository<EmailAuth, Long> {
    Optional<EmailAuth> findByEmail(String email);

    Optional<EmailAuth> findByEmailAndVerifyCode(String email, String verifyCode);

    void deleteByExpireDateTimeBefore(LocalDateTime now);
}
