package com.ssafy.butter.domain.member.entity;

import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.member.enums.Gender;
import com.ssafy.butter.domain.member.vo.BirthDate;
import com.ssafy.butter.domain.member.vo.BreadAmount;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.domain.member.vo.Password;
import jakarta.persistence.CascadeType;
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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "avatar_type_id")
    private AvatarType avatarType;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
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

    @NotNull
    private LocalDate createDate;

    @NotNull
    private boolean isExtraInfoRegistered;

    @Builder
    public Member(MemberType memberType, AvatarType avatarType, List<MemberGenre> memberGenres, String loginId,
                  Nickname nickname, Email email, BirthDate birthDate, BreadAmount breadAmount, Password password,
                  String profileImage, Gender gender, LocalDate createDate, boolean isExtraInfoRegistered) {
        this.memberType = memberType;
        this.avatarType = (avatarType == null) ? new AvatarType("DEFAULT_AVATARTYPE"):avatarType;
        this.memberGenres = memberGenres;
        this.loginId = loginId;
        this.nickname = (nickname == null) ? new Nickname("DEFAULT_NICKNAME") : nickname;
        this.email = email;
        this.birthDate = birthDate;
        this.breadAmount = breadAmount;
        this.password = password;
        this.profileImage = profileImage;
        this.gender = gender;
        this.createDate = createDate;
        this.isExtraInfoRegistered = isExtraInfoRegistered;
    }

    public void updateProfile(String nickname, String gender, String profileImage, List<Genre> genres){
        if(nickname != null){
            this.nickname = new Nickname(nickname);
        }
        if(gender != null){
            this.gender = Gender.from(gender);
        }
        if(profileImage != null){
            this.profileImage = profileImage;
        }
        if(genres != null){
            updateMemberGenres(genres);
        }
    }

    public void saveExtraInfo(Nickname nickname, String profileImage, AvatarType avatarType, List<Genre> genres){
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.avatarType = avatarType;
        updateMemberGenres(genres);
    }

    public void changePassword(Password password){
        this.password = password;
    }

    private void updateMemberGenres(List<Genre> newGenres){
        memberGenres.clear();
        newGenres.forEach(genre -> this.memberGenres.add(new MemberGenre(this, genre)));
    }
}


