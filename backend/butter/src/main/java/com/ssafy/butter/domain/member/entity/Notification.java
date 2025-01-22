package com.ssafy.butter.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @Column(length = 200)
    @NotNull
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @Builder
    public Notification(String content, Member member) {
        this.content = content;
        this.member = member;
    }

}
