package com.ssafy.butter.domain.member.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BirthDate {
    @NotNull
    @Column(name = "birth_date")
    private LocalDate value;

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
}

