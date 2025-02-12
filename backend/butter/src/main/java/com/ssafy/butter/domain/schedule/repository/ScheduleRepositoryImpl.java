package com.ssafy.butter.domain.schedule.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.entity.QSchedule;
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

    private final QSchedule qSchedule = QSchedule.schedule;

    private final ScheduleJpaRepository scheduleJpaRepository;
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Schedule save(Schedule schedule) {
        return scheduleJpaRepository.save(schedule);
    }

    @Override
    public Optional<Schedule> findById(Long id) {
        return scheduleJpaRepository.findById(id);
    }

    @Override
    public void delete(Schedule schedule) {
        scheduleJpaRepository.delete(schedule);
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

    @Override
    public List<Schedule> getScheduleList(ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        return jpaQueryFactory.selectFrom(qSchedule)
                .where(createScheduleCondition(scheduleSearchRequestDTO))
                .fetch();
    }

    private BooleanBuilder createScheduleCondition(ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        BooleanBuilder builder = new BooleanBuilder();
        if (scheduleSearchRequestDTO.keyword() != null) {
            String[] keywords = scheduleSearchRequestDTO.keyword().split(" ");
            for (String keyword : keywords) {
                builder.and(qSchedule.place.contains(keyword));
            }
        }
        if (scheduleSearchRequestDTO.date() != null) {
            builder.and(qSchedule.buskingDate.goe(scheduleSearchRequestDTO.date().atStartOfDay()))
                    .and(qSchedule.buskingDate.lt(scheduleSearchRequestDTO.date().plusDays(1).atStartOfDay()));
        }
        return builder;
    }
}
