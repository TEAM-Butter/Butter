package com.ssafy.butter.domain.member.vo;

import com.ssafy.butter.global.util.encrypt.EncryptUtils;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Password {

    @Column(name = "password", length = 200)
    private String value;

    private Password(String value) {
        this.value = value;
    }

    public static Password raw(String rawPassword){
        validate(rawPassword);
        return new Password(rawPassword);
    }

    public static Password encrypted(String encryptedPassword){
        return new Password(encryptedPassword);
    }

    public Password encrypt(EncryptUtils encryptUtils){
        String encrypted = encryptUtils.encrypt(this.value);
        return new Password(encrypted);
    }

    private static void validate(String value) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("ERR : 패스워드가 공백입니다");
        }
        if (value.length() < 8) {
            throw new IllegalArgumentException("ERR : 패스워드는 최소 8자입니다");
        }
        if (!value.matches(".*[a-zA-Z].*")) {
            throw new IllegalArgumentException("ERR : 패스워드는 최소 하나 이상의 영문을 포함해야합니다");
        }
        if (!value.matches(".*[0-9].*")) {
            throw new IllegalArgumentException("ERR : 패스워드는 최소 하나 이상의 숫자를 포함해야합니다");
        }
        if (!value.matches(".*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?].*")) {
            throw new IllegalArgumentException("ERR : 패스워드는 최소 하나 이상의 특수문자를 포함해야합니다");
        }
    }

    @Override
    public String toString() {
        return "****";
    }
}