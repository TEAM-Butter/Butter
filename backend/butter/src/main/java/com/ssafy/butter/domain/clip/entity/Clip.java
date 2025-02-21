package com.ssafy.butter.domain.clip.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.crew.entity.Crew;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Clip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clip_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    @NotNull
    private Crew crew;

    @Column(length = 50)
    @NotNull
    private String title;

    @Column(length = 2048)
    @NotNull
    private String videoName;

    @Column(length = 2048)
    @NotNull
    private String videoUrl;

    @NotNull
    @ColumnDefault("0")
    private Long hitCount;

    @JsonIgnore
    @OneToMany(mappedBy = "clip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LikedClip> likedClips = new ArrayList<>();

    @Builder
    public Clip(Long id, Crew crew, String title, String videoName, String videoUrl, Long hitCount, List<LikedClip> likedClips) {
        this.id = id;
        this.crew = crew;
        this.title = title;
        this.videoName = videoName;
        this.videoUrl = videoUrl;
        this.hitCount = hitCount;
        this.likedClips = likedClips;
    }

    public void updateVideoUrl(String videoUrl) {
        this.videoName = videoUrl;
    }
}