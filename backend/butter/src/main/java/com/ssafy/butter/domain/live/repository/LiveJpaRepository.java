package com.ssafy.butter.domain.live.repository;

import com.ssafy.butter.domain.live.entity.Live;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveJpaRepository extends JpaRepository<Live, Long> {
}
