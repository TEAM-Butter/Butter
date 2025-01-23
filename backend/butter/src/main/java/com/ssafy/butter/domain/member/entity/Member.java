package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_type_id")
    @NotNull
    private MemberType memberType;

    @Builder
    public Member(String nickname, String email, String password, String imageUrl, LocalDate createDate, LocalDate birthDate, Integer gender, String phoneNumber, Integer breadAmount, Integer avatarType, MemberType memberType) {
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
        this.memberType = memberType;
    }
}
