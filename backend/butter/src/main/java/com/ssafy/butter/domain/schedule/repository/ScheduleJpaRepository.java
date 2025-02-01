package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.schedule.entity.Schedule;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleJpaRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByOrderByIdDesc(Pageable pageable);

    List<Schedule> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);

    List<Schedule> findAllByBuskingDate(LocalDateTime buskingDate);
}
