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
    private String loginId;

    @Embedded
    private Nickname nickname;

    @Embedded
    private Email email;

    @Embedded
    private PhoneNumber phoneNumber;

    @Embedded
    private BirthDate birthDate;

    @Embedded
    private BreadAmount breadAmount;

    @Column(length = 200)
    private String password;

    @Column(length = 2048)
    private String imageUrl;

    @NotNull
    private Integer gender;

    @NotNull
    private Integer avatarType;

    @NotNull
    private LocalDate createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_type_id")
    @NotNull
    private MemberType memberType;

    @Builder
    public Member(Nickname nickname, Email email, String password, String imageUrl, BirthDate birthDate, Integer gender,
                  PhoneNumber phoneNumber, BreadAmount breadAmount, Integer avatarType, LocalDate createDate,
                  MemberType memberType) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.imageUrl = imageUrl;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.breadAmount = breadAmount;
        this.avatarType = avatarType;
        this.createDate = createDate;
        this.memberType = memberType;
    }
}

