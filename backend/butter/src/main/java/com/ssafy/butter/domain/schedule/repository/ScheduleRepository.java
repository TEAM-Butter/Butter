package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository {

    Schedule save(Schedule schedule);

    Optional<Schedule> findById(Long id);

    void delete(Schedule schedule);

    List<Schedule> findAllByOrderByIdDesc(Pageable pageable);

    List<Schedule> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);

    List<Schedule> findAllByBuskingDate(LocalDateTime buskingDate);

    List<Schedule> getScheduleList(ScheduleSearchRequestDTO scheduleSearchRequestDTO);
}
