package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
