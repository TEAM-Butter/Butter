package com.ssafy.butter.domain.crew.entity;

import com.ssafy.butter.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    @NotNull
    private Crew crew;

    @NotNull
    private Boolean isFollowed;

    @Builder
    public Follow(Member member, Crew crew, Boolean isFollowed) {
        this.member = member;
        this.crew = crew;
        this.isFollowed = isFollowed;
    }

    public void updateIsFollowed(Boolean isFollowed) {
        this.isFollowed = isFollowed;
    }
}
