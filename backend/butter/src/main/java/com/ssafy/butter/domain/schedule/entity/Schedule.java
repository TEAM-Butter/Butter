package com.ssafy.butter.domain.schedule.entity;

import com.ssafy.butter.domain.crew.entity.Crew;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @NotNull
    private LocalDateTime createTime;//TODO: 시간 베이스 엔티티 추가
    private LocalDateTime updateTime;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private String place;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    @Builder
    public Schedule(Crew crew, LocalDateTime createTime, LocalDateTime updateTime, String title, String content,
                    String place, double latitude, double longitude) {
        this.crew = crew;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.title = title;
        this.content = content;
        this.place = place;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
