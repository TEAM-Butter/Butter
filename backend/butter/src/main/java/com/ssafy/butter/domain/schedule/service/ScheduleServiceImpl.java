package com.ssafy.butter.domain.schedule.service;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import com.ssafy.butter.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final CrewService crewService;

    @Override
    public ScheduleResponseDTO createSchedule(ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        Crew crew = crewService.findById(scheduleSaveRequestDTO.crewId());
        Schedule schedule = Schedule.builder()
                .crew(crew)
                .title(scheduleSaveRequestDTO.title())
                .content(scheduleSaveRequestDTO.content())
                .place(scheduleSaveRequestDTO.place())
                .latitude(scheduleSaveRequestDTO.latitude())
                .longitude(scheduleSaveRequestDTO.longitude())
                .build();
        return ScheduleResponseDTO.fromEntity(scheduleRepository.save(schedule));
    }
}
