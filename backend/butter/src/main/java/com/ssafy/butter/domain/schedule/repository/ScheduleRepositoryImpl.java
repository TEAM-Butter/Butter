package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ScheduleRepositoryImpl implements ScheduleRepository {

    private final ScheduleJpaRepository scheduleJpaRepository;

    @Override
    public Schedule save(Schedule schedule) {
        return scheduleJpaRepository.save(schedule);
    }

    @Override
    public Optional<Schedule> findById(Long id) {
        return scheduleJpaRepository.findById(id);
    }

    @Override
    public List<Schedule> findAllByOrderByIdDesc(Pageable pageable) {
        return scheduleJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Schedule> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return scheduleJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }

    @Override
    public List<Schedule> findAllByBuskingDate(LocalDateTime buskingDate) {
        return scheduleJpaRepository.findAllByBuskingDate(buskingDate);
    }
}
