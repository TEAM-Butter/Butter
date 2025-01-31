package com.ssafy.butter.domain.schedule.dto.response;

import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(Long id, CrewResponseDTO crew, String title, String content, String place, Double latitude, Double longitude, LocalDateTime createDate, LocalDateTime updateDate) {

    public static ScheduleResponseDTO fromEntity(Schedule schedule) {
        return new ScheduleResponseDTO(
                schedule.getId(),
                CrewResponseDTO.fromEntity(schedule.getCrew()),
                schedule.getTitle(),
                schedule.getContent(),
                schedule.getPlace(),
                schedule.getLatitude(),
                schedule.getLongitude(),
                schedule.getCreateDate(),
                schedule.getUpdateDate()
        );
    }
}
