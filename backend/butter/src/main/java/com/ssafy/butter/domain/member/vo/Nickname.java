package com.ssafy.butter.domain.member.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
@Embeddable
@EqualsAndHashCode
public class Nickname {
    @Column(name = "nickname", length = 50)
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
}

