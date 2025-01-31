package com.ssafy.butter.domain.member.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BreadAmount {
    @NotNull
    @Column(name = "bread_amount")
    private Integer value;

    public BreadAmount(Integer amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("ERR : 빵은 최소 0개 이상입니다");
        }
        this.value = amount;
    }

    public Integer getAmount() {
        return value;
    }

    public BreadAmount add(int value) {
        return new BreadAmount(this.value + value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BreadAmount that = (BreadAmount) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}

