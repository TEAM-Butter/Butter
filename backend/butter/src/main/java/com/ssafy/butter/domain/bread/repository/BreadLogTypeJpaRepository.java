package com.ssafy.butter.domain.bread.repository;

import com.ssafy.butter.domain.bread.entity.BreadLogType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BreadLogTypeJpaRepository extends JpaRepository<BreadLogType, Long> {

    Optional<BreadLogType> findByName(String name);
}
