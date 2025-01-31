package com.ssafy.butter.domain.member.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhoneNumber {
    @NotNull
    @Column(name = "phone_number")
    private String value;

    public PhoneNumber(String number) {
        if (!number.matches("^\\d{3}-\\d{3,4}-\\d{4}$")) {
            throw new IllegalArgumentException("ERR : 전화 번호 양식에 부합 하지 않습니다");
        }
        this.value = number;
    }

    public String getNumber() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhoneNumber that = (PhoneNumber) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
