package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import java.util.Objects;

@Embeddable
public class Nickname {
    @NotNull
    private String value;

    protected Nickname() {}

    public Nickname(String value) {
        if (value.length() < 3 || value.length() > 50) {
            throw new IllegalArgumentException("ERR : 닉네임은 3 글자 이상 50 글자 미만으로 설정할 수 있습니다");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Nickname nickname = (Nickname) o;
        return Objects.equals(value, nickname.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}

