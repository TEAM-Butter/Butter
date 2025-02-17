package com.ssafy.butter.domain.schedule.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.member.entity.QMember;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.entity.QLikedSchedule;
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
    private final QLikedSchedule qLikedSchedule = QLikedSchedule.likedSchedule;
    private final QMember qMember = QMember.member;

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

    @Override
    public List<Schedule> getLikedScheduleList(Long memberId) {
        return jpaQueryFactory.selectDistinct(qSchedule)
                .from(qSchedule)
                .join(qSchedule.likedSchedules, qLikedSchedule).fetchJoin()
                .join(qLikedSchedule.member, qMember).fetchJoin()
                .where(createLikedScheduleListCondition(memberId))
                .orderBy(qLikedSchedule.id.desc())
                .fetch();
    }

    private BooleanBuilder createLikedScheduleListCondition(Long memberId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qMember.id.eq(memberId))
                .and(qLikedSchedule.isLiked);
        return booleanBuilder;
    }
}
