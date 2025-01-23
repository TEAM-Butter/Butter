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
public class BreadLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bread_log_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne
    @JoinColumn(name = "bread_log_type_id")
    @NotNull
    private BreadLogType breadLogType;

    @Builder
    public BreadLog(Member member) {
        this.member = member;
    }

}
