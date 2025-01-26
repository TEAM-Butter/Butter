package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
}
