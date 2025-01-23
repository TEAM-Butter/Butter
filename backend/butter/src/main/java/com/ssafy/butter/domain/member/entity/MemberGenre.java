package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_genre_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @Builder
    public MemberGenre(Member member) {
        this.member = member;
    }

}
