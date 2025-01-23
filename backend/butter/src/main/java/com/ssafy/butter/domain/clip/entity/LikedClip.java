package com.ssafy.butter.domain.clip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikedClip {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clip_id")
    private Long id;
}
