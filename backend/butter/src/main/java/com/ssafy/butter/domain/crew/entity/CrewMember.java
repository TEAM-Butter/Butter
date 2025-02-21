package com.ssafy.butter.domain.crew.entity;

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
public class CrewMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    @NotNull
    private Crew crew;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @NotNull
    private Boolean isCrewAdmin;

    @Builder
    public CrewMember(Crew crew, Member member, Boolean isCrewAdmin) {
        this.crew = crew;
        this.member = member;
        this.isCrewAdmin = isCrewAdmin;
    }
}
