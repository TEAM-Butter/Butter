package com.ssafy.butter.domain.clip.entity;

import com.ssafy.butter.domain.live.entity.Live;
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
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Clip {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clip_id")
    private Long id;

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

    @Builder
    public Clip(Live live, String title, String videoUrl, Long hitCount) {
        this.live = live;
        this.title = title;
        this.videoUrl = videoUrl;
        this.hitCount = hitCount;
    }
}