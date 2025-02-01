package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.schedule.entity.LikedSchedule;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class LikedScheduleRepositoryImpl implements LikedScheduleRepository {

    private final LikedScheduleJpaRepository likedScheduleJpaRepository;

    @Override
    public LikedSchedule save(LikedSchedule likedSchedule) {
        return likedScheduleJpaRepository.save(likedSchedule);
    }

    @Override
    public Optional<LikedSchedule> findByMemberAndSchedule(Member member, Schedule schedule) {
        return likedScheduleJpaRepository.findByMemberAndSchedule(member, schedule);
    }
}
