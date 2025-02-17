package com.ssafy.butter.domain.bread.entity;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class BreadLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bread_log_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bread_log_type_id")
    @NotNull
    private BreadLogType breadLogType;

    @NotNull
    LocalDateTime createDate;

    @NotNull
    private Integer amount;

    @Builder
    public BreadLog(Member member, Crew crew, BreadLogType breadLogType, LocalDateTime createDate, Integer amount) {
        this.member = member;
        this.crew = crew;
        this.breadLogType = breadLogType;
        this.createDate = createDate;
        this.amount = amount;
    }
}
