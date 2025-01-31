package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CrewJpaRepository extends JpaRepository<Crew, Long> {

    List<Crew> findAllByOrderByIdDesc(Pageable pageable);

    List<Crew> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);
}
