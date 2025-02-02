package com.ssafy.butter.domain.member.enums;

public enum Gender {
    MALE, FEMALE;

    public static Gender from(String value) {
        if (value == null) {
            throw new IllegalArgumentException("ERR : Gender 값은 NULL일 수 없습니다");
        }

        try {
            return Gender.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("ERR : " + value + "는 유효한 Gender 값이 아닙니다");
        }
    }
}
