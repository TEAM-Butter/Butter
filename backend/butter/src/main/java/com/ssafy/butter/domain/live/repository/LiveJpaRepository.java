package com.ssafy.butter.domain.live.repository;

import com.ssafy.butter.domain.live.entity.Live;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LiveJpaRepository extends JpaRepository<Live, Long> {

    List<Live> findAllByOrderByIdDesc(Pageable pageable);

    List<Live> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);
}
