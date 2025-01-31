package com.ssafy.butter.infrastructure.emailAuth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EmailAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String email;

    @NotNull
    private String verifyCode;

    @NotNull
    private LocalDateTime expireDateTime;

    @Builder
    public EmailAuth(String email, String authCode, LocalDateTime expireDateTime) {
        this.email = email;
        this.verifyCode = authCode;
        this.expireDateTime = expireDateTime;
    }
}
