package com.ssafy.butter.domain.clip.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.butter.domain.live.entity.Live;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @JoinColumn(name = "live_id")
    @NotNull
    private Live live;

    @Column(length = 50)
    @NotNull
    private String title;

    @Column(length = 2048)
    @NotNull
    private String videoUrl;

    @NotNull
    private Long hitCount;

    @JsonIgnore
    @OneToMany(mappedBy = "clip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LikedClip> likedClips = new ArrayList<>();

    @Builder
    public Clip(Live live, String title, String videoUrl, Long hitCount, List<LikedClip> likedClips) {
        this.live = live;
        this.title = title;
        this.videoUrl = videoUrl;
        this.hitCount = hitCount;
        this.likedClips = likedClips;
    }

    public void updateVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}