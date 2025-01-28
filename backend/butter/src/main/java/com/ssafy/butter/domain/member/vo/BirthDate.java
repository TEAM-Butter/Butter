package com.ssafy.butter.domain.member.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

@Embeddable
public class BirthDate {
    @NotNull
    @Column(name = "birth_date")
    private LocalDate value;

    protected BirthDate() {}

    public BirthDate(LocalDate date) {
        if (date.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("ERR : 생년월일로 선택할 수 없습니다");
        }
        this.value = date;
    }

    public LocalDate getDate() {
        return value;
    }

    public int calculateAge() {
        return Period.between(this.value, LocalDate.now()).getYears();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BirthDate birthDate = (BirthDate) o;
        return Objects.equals(value, birthDate.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}

