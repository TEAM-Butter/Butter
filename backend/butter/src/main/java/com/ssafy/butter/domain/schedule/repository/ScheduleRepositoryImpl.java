package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ScheduleRepositoryImpl implements ScheduleRepository {

    private final ScheduleJpaRepository scheduleJpaRepository;

    @Override
    public Schedule save(Schedule schedule) {
        return scheduleJpaRepository.save(schedule);
    }

    @Override
    public List<Schedule> findAllByOrderByIdDesc(Pageable pageable) {
        return scheduleJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Schedule> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return scheduleJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }
}
