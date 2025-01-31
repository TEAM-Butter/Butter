package com.ssafy.butter.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.crew.entity.Genre;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_id")
    @NotNull
    private Genre genre;

    @Builder
    public MemberGenre(Member member, Genre genre) {
        this.member = member;
        this.genre = genre;
    }
}
