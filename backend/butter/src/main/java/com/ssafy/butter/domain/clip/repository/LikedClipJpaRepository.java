package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.LikedClip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedClipJpaRepository extends JpaRepository<LikedClip, Long> {
}
