package com.ssafy.butter.domain.member.entity;

import com.ssafy.butter.domain.member.vo.BirthDate;
import com.ssafy.butter.domain.member.vo.BreadAmount;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.domain.member.vo.Password;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_type_id")
    @NotNull
    private MemberType memberType;

    @OneToMany(mappedBy = "member")
    private List<MemberGenre> memberGenres = new ArrayList<>();

    private String loginId;

    @Embedded
    private Nickname nickname;

    @Embedded
    private Email email;

    @Embedded
    private BirthDate birthDate;

    @Embedded
    private BreadAmount breadAmount;

    @Embedded
    private Password password;

    @Column(length = 2048)
    private String imageUrl;

    @NotNull
    private Integer gender;

    @NotNull
    private Integer avatarType;

    @NotNull
    private LocalDate createDate;

    @Builder
    public Member(MemberType memberType, List<MemberGenre> memberGenres, String loginId, Nickname nickname, Email email, BirthDate birthDate, BreadAmount breadAmount, Password password, String imageUrl, Integer gender, Integer avatarType, LocalDate createDate) {
        this.memberType = memberType;
        this.memberGenres = memberGenres;
        this.loginId = loginId;
        this.nickname = nickname;
        this.email = email;
        this.birthDate = birthDate;
        this.breadAmount = breadAmount;
        this.password = password;
        this.imageUrl = imageUrl;
        this.gender = gender;
        this.avatarType = avatarType;
        this.createDate = createDate;
    }
}

