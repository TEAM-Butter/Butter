package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClipJpaRepository extends JpaRepository<Clip, Long> {
}
