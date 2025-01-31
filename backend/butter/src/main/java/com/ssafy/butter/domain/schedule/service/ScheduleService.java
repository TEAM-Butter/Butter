package com.ssafy.butter.domain.schedule.service;

import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;

public interface ScheduleService {

    ScheduleResponseDTO createSchedule(ScheduleSaveRequestDTO scheduleSaveRequestDTO);
}
