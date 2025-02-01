package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.schedule.entity.LikedSchedule;
import com.ssafy.butter.domain.schedule.entity.Schedule;

import java.util.Optional;

public interface LikedScheduleRepository {

    Optional<LikedSchedule> findByMemberAndSchedule(Member member, Schedule schedule);
}
