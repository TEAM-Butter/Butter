package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleJpaRepository extends JpaRepository<Schedule, Long> {
}
