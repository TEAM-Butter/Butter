package com.ssafy.butter.domain.crew.entity;

import com.ssafy.butter.domain.schedule.entity.Schedule;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Crew {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_id")
    private Long id;

    @OneToMany(mappedBy = "crew", fetch = FetchType.LAZY)
    private List<Schedule> schedules = new ArrayList<>();

    @NotNull
    private String name;

    @NotNull
    private String description;
    private String imageUrl;
    private String promotionUrl;

    @NotNull
    private String portfolioVideoUrl;

    @NotNull
    private int donationAmount;

    @Builder
    public Crew(List<Schedule> schedules, String name, String description, String imageUrl, String promotionUrl,
                String portfolioVideoUrl, int donationAmount) {
        this.schedules = schedules;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.promotionUrl = promotionUrl;
        this.portfolioVideoUrl = portfolioVideoUrl;
        this.donationAmount = donationAmount;
    }
}
