package com.ssafy.butter.domain.schedule.repository;

import com.ssafy.butter.domain.schedule.entity.Schedule;

public interface ScheduleRepository {

    Schedule save(Schedule schedule);
}
