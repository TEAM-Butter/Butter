package com.ssafy.butter.domain.member.entity;

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
public class BreadLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long breadLogId;

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
