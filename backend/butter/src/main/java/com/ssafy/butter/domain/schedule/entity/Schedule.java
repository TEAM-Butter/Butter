package com.ssafy.butter.domain.schedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.common.TimestampedEntity;
import com.ssafy.butter.domain.crew.entity.Crew;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private double latitude;

    @NotNull
    private double longitude;

    @Builder
    public Schedule(Crew crew, String title, String content,
                    String place, double latitude, double longitude) {
        this.crew = crew;
        this.title = title;
        this.content = content;
        this.place = place;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
