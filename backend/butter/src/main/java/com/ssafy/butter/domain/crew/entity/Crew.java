package com.ssafy.butter.domain.crew.entity;

import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.common.TimestampedEntity;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Crew extends TimestampedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_id")
    private Long id;

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules = new ArrayList<>();

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notice> notices = new ArrayList<>();

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Live> lives = new ArrayList<>();

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CrewGenre> crewGenres = new ArrayList<>();

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CrewMember> crewMembers = new ArrayList<>();

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> follows = new ArrayList<>();

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Clip> clips = new ArrayList<>();

    @Column(length = 50)
    @NotNull
    private String name;

    @Column(length = 200)
    @NotNull
    private String description;

    @Column(length = 2048)
    private String imageUrl;

    @Column(length = 2048)
    private String promotionUrl;

    @Column(length = 2048)
    @NotNull
    private String portfolioVideoUrl;

    @NotNull
    private int donationAmount;

    @Builder
    public Crew(List<Schedule> schedules, List<Notice> notices, List<Live> lives, List<CrewGenre> crewGenres,
                List<CrewMember> crewMembers, List<Follow> follows, List<Clip> clips, String name, String description,
                String imageUrl, String promotionUrl, String portfolioVideoUrl, int donationAmount) {
        this.schedules = schedules;
        this.notices = notices;
        this.lives = lives;
        this.crewGenres = crewGenres;
        this.crewMembers = crewMembers;
        this.follows = follows;
        this.clips = clips;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.promotionUrl = promotionUrl;
        this.portfolioVideoUrl = portfolioVideoUrl;
        this.donationAmount = donationAmount;
    }

    public void update(CrewSaveRequestDTO crewSaveRequestDTO, String imageUrl) {
        this.name = crewSaveRequestDTO.name();
        this.description = crewSaveRequestDTO.description();
        this.promotionUrl = crewSaveRequestDTO.promotionUrl();
        this.imageUrl = imageUrl;
    }

    public void updateFileUrl(String imageUrl, String portfolioVideoUrl) {
        this.imageUrl = imageUrl;
        this.portfolioVideoUrl = portfolioVideoUrl;
    }
}
