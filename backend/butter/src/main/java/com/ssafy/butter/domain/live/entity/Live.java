package com.ssafy.butter.domain.live.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.crew.entity.Crew;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Live {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    @NotNull
    @JsonIgnore
    private Crew crew;

    @OneToMany(mappedBy = "live", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Clip> clips = new ArrayList<>();

    @Column(length = 50)
    @NotNull
    private String title;

    @NotNull
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @Builder
    public Live(Crew crew, List<Clip> clips, String title, LocalDateTime startDate, LocalDateTime endDate) {
        this.crew = crew;
        this.clips = clips;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
