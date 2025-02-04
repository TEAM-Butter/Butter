package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Notice;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository {

    Notice save(Notice notice);

    Optional<Notice> findById(Long id);

    void delete(Notice notice);

    List<Notice> findAllByOrderByIdDesc(Pageable pageable);

    List<Notice> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);
}
