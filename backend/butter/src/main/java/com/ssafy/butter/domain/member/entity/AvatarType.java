package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class AvatarType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "avatar_type_id")
    private Long id;

    @NotNull
    private String name;

    public AvatarType(String name) {
        this.name = name;
    }

    public AvatarType() {

    }
}