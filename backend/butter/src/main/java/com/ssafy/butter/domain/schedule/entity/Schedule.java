package com.ssafy.butter.domain.schedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.common.TimestampedEntity;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule extends TimestampedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    @JsonIgnore
    private Crew crew;

    @Column(length = 50)
    @NotNull
    private String title;

    @Column(length = 200)
    @NotNull
    private String content;

    @Column(length = 200)
    @NotNull
    private String place;

    @NotNull
    private LocalDateTime buskingDate;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    @JsonIgnore
    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LikedSchedule> likedSchedules = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "schedule", cascade = CascadeType.ALL, orphanRemoval = true)
    private Live live;

    @Builder
    public Schedule(Crew crew, String title, String content,
                    String place, LocalDateTime buskingDate, double latitude, double longitude,
                    List<LikedSchedule> likedSchedules, Live live) {
        this.crew = crew;
        this.title = title;
        this.content = content;
        this.place = place;
        this.buskingDate = buskingDate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.likedSchedules = likedSchedules;
        this.live = live;
    }

    public void update(ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        this.title = scheduleSaveRequestDTO.title();
        this.content = scheduleSaveRequestDTO.content();
        this.place = scheduleSaveRequestDTO.place();
        this.buskingDate = scheduleSaveRequestDTO.buskingDate();
        this.latitude = scheduleSaveRequestDTO.latitude();
        this.longitude = scheduleSaveRequestDTO.longitude();
    }
}
