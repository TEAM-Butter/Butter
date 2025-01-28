package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
}
