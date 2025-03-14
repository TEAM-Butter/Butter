package com.ssafy.butter.domain.schedule.entity;

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
public class LikedSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liked_schedule_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    @NotNull
    private Schedule schedule;

    @NotNull
    private Boolean isLiked;

    @Builder
    public LikedSchedule(Member member, Schedule schedule, Boolean isLiked) {
        this.member = member;
        this.schedule = schedule;
        this.isLiked = isLiked;
    }

    public void updateIsLiked(Boolean isLiked) {
        this.isLiked = isLiked;
    }
}
