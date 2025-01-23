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
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @Builder
    public Follow(Member member) {
        this.member = member;
    }

}
