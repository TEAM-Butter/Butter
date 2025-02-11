package com.ssafy.butter.domain.schedule.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.entity.QSchedule;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ScheduleRepositoryImpl implements ScheduleRepository {

    private static final QSchedule qSchedule = QSchedule.schedule;

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
                .limit(scheduleSearchRequestDTO.pageSize())
                .fetch();
    }

    private BooleanExpression[] createScheduleCondition(ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        String[] keywords = scheduleSearchRequestDTO.keyword().split(" ");
        return new BooleanExpression[] {
                // 일정의 장소가 키워드를 모두 포함하는지
                Arrays.stream(keywords).map(qSchedule.place::contains).reduce(BooleanExpression::and).orElse(null),
                // 요청 date <= 버스킹 날짜 < 요청 date + 1 만족하는지
                scheduleSearchRequestDTO.date() == null ? null :
                        qSchedule.buskingDate.goe(scheduleSearchRequestDTO.date().atStartOfDay()).and(
                                qSchedule.buskingDate.lt(scheduleSearchRequestDTO.date().plusDays(1).atStartOfDay())
                        )
        };
    }
}
