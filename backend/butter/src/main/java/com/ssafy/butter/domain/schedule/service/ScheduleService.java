package com.ssafy.butter.domain.schedule.service;

import com.ssafy.butter.domain.schedule.dto.request.ScheduleCalendarRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;

import java.util.List;

public interface ScheduleService {

    ScheduleResponseDTO createSchedule(ScheduleSaveRequestDTO scheduleSaveRequestDTO);

    List<ScheduleResponseDTO> searchSchedule(ScheduleSearchRequestDTO scheduleSearchRequestDTO);

    List<ScheduleResponseDTO> getScheduleCalendarList(ScheduleCalendarRequestDTO scheduleCalendarRequestDTO);

    ScheduleResponseDTO getScheduleDetail(Long id);
}
