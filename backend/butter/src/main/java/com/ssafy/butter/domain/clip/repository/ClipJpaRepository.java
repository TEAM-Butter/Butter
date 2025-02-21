package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClipJpaRepository extends JpaRepository<Clip, Long> {

    List<Clip> findAllByOrderByIdDesc(Pageable pageable);
    List<Clip> findAllByOrderById(Pageable pageable);

    List<Clip> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);
    List<Clip> findAllByIdGreaterThanOrderById(Long id, Pageable pageable);
}
