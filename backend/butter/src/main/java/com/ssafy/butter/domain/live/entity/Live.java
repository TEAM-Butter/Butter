package com.ssafy.butter.domain.live.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.crew.entity.Crew;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @OneToMany(mappedBy = "live")
    private List<Clip> clips = new ArrayList<>();

    @Column(length = 50)
    @NotNull
    private String title;

    @NotNull
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @Builder
    public Live(Crew crew, String title, LocalDateTime startDate, LocalDateTime endDate) {
        this.crew = crew;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
