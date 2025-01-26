package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

@Embeddable
public class BirthDate {
    @NotNull
    private LocalDate date;

    protected BirthDate() {}

    public BirthDate(LocalDate date) {
        if (date.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("ERR : 생년월일로 선택할 수 없습니다");
        }
        this.date = date;
    }

    public LocalDate getDate() {
        return date;
    }

    public int calculateAge() {
        return Period.between(this.date, LocalDate.now()).getYears();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BirthDate birthDate = (BirthDate) o;
        return Objects.equals(date, birthDate.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date);
    }
}

