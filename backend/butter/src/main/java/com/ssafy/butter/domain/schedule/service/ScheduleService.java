package com.ssafy.butter.domain.schedule.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleLikeRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;

import java.util.List;

public interface ScheduleService {

    ScheduleResponseDTO createSchedule(AuthInfoDTO currentUser, ScheduleSaveRequestDTO scheduleSaveRequestDTO);

    List<ScheduleResponseDTO> searchSchedule(AuthInfoDTO currentUser, ScheduleSearchRequestDTO scheduleSearchRequestDTO);

    ScheduleResponseDTO getScheduleDetail(AuthInfoDTO currentUser, Long id);

    ScheduleResponseDTO updateSchedule(AuthInfoDTO currentUser, Long id, ScheduleSaveRequestDTO scheduleSaveRequestDTO);

    ScheduleResponseDTO deleteSchedule(AuthInfoDTO currentUser, Long id);

    void likeSchedule(AuthInfoDTO currentUser, ScheduleLikeRequestDTO scheduleLikeRequestDTO);

    void unlikeSchedule(AuthInfoDTO currentUser, Long scheduleId);

    Schedule findById(Long id);

    List<ScheduleResponseDTO> getLikedScheduleList(AuthInfoDTO currentUser);

    List<ScheduleResponseDTO> getMyCrewScheduleList(AuthInfoDTO currentUser);
}
