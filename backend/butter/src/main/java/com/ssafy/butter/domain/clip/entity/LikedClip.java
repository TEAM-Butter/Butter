package com.ssafy.butter.domain.clip.entity;

import com.ssafy.butter.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikedClip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liked_clip_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clip_id")
    @NotNull
    private Clip clip;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @NotNull
    private Boolean isLiked;

    @Builder
    public LikedClip(Clip clip, Member member, Boolean isLiked) {
        this.clip = clip;
        this.member = member;
        this.isLiked = isLiked;
    }

    public void updateIsLiked(Boolean isLiked) {
        this.isLiked = isLiked;
    }
}
