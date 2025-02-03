package com.ssafy.butter.domain.member.entity;

import com.ssafy.butter.domain.member.enums.Gender;
import com.ssafy.butter.domain.member.vo.BirthDate;
import com.ssafy.butter.domain.member.vo.BreadAmount;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.domain.member.vo.Password;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private String profileImage;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer avatarType;

    @NotNull
    private LocalDate createDate;

    private boolean isExtraInfoRegistered;

    @Builder
    public Member(MemberType memberType, List<MemberGenre> memberGenres, String loginId, Nickname nickname, Email email, BirthDate birthDate, BreadAmount breadAmount, Password password, String profileImage, Gender gender, Integer avatarType, LocalDate createDate, boolean isExtraInfoRegistered) {
        this.memberType = memberType;
        this.memberGenres = memberGenres;
        this.loginId = loginId;
        this.nickname = nickname;
        this.email = email;
        this.birthDate = birthDate;
        this.breadAmount = breadAmount;
        this.password = password;
        this.profileImage = profileImage;
        this.gender = gender;
        this.avatarType = avatarType;
        this.createDate = createDate;
        this.isExtraInfoRegistered = isExtraInfoRegistered;
    }

    public void updateProfile(String nickname, String gender, String profileImage){
        if(nickname != null){
            this.nickname = new Nickname(nickname);
        }
        if(gender != null){
            this.gender = Gender.from(gender);
        }
        if(profileImage != null){
            this.profileImage = profileImage;
        }
    }

    public void changePassword(Password password){
        this.password = password;
    }

}

