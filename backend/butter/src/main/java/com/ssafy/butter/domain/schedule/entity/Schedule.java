package com.ssafy.butter.domain.schedule.entity;

import com.ssafy.butter.domain.crew.entity.Crew;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
public class Schedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buskingScheduleId;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "crew_id")
    private Crew crew;
    @NotNull
    private LocalDateTime createTime;
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
}
