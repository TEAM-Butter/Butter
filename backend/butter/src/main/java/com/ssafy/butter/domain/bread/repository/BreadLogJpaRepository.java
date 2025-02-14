package com.ssafy.butter.domain.bread.repository;

import com.ssafy.butter.domain.bread.entity.BreadLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreadLogJpaRepository extends JpaRepository<BreadLog, Long> {
}
