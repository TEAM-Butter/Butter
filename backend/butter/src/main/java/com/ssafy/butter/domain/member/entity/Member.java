package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 50)
    @NotNull
    private String nickname;

    @Column(length = 50)
    @NotNull
    private String email;

    @Column(length = 200)
    private String password;

    @Column(length = 2048)
    private String imageUrl;

    @NotNull
    private LocalDate createDate;

    @NotNull
    private LocalDate birthDate;

    @NotNull
    private Integer gender;

    @NotNull
    private String phoneNumber;

    @NotNull
    private Integer breadAmount;

    @NotNull
    private Integer avatarType;

    @ManyToOne
    @JoinColumn(name = "member_type_id")
    @NotNull
    private MemberType memberType;

    @Builder
    public Member(String nickname, String email, String password, String imageUrl, LocalDate createDate, LocalDate birthDate, Integer gender, String phoneNumber, Integer breadAmount, Integer avatarType) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.imageUrl = imageUrl;
        this.createDate = createDate;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.breadAmount = breadAmount;
        this.avatarType = avatarType;
    }

}
