package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Notice;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeJpaRepository extends JpaRepository<Notice, Long> {

    List<Notice> findAllByOrderByIdDesc(Pageable pageable);

    List<Notice> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);
}
