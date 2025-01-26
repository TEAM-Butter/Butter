package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import java.util.Objects;

@Embeddable
public class BreadAmount {
    @NotNull
    private Integer amount;

    protected BreadAmount() {}

    public BreadAmount(Integer amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("ERR : 빵은 최소 0개 이상입니다");
        }
        this.amount = amount;
    }

    public Integer getAmount() {
        return amount;
    }

    public BreadAmount add(int value) {
        return new BreadAmount(this.amount + value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BreadAmount that = (BreadAmount) o;
        return Objects.equals(amount, that.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amount);
    }
}

