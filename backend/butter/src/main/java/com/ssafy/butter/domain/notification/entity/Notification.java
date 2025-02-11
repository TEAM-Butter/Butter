package com.ssafy.butter.domain.notification.entity;

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
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @Column(length = 200)
    @NotNull
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @Column(length = 500)
    private String url;

    @Column(length = 50)
    private String notificationType;

    private char readYn;
    private char deletedYn;

    @Builder
    public Notification(String content, Member member, String url, String notificationType, char readYn, char deletedYn) {
        this.content = content;
        this.member = member;
        this.url = url;
        this.notificationType = notificationType;
        this.readYn = readYn;
        this.deletedYn = deletedYn;
    }
}