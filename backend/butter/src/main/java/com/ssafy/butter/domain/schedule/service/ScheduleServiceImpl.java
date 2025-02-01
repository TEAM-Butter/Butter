package com.ssafy.butter.domain.schedule.service;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleCalendarRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import com.ssafy.butter.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
                .buskingDate(scheduleSaveRequestDTO.buskingDate())
                .latitude(scheduleSaveRequestDTO.latitude())
                .longitude(scheduleSaveRequestDTO.longitude())
                .build();
        return ScheduleResponseDTO.fromEntity(scheduleRepository.save(schedule));
    }

    @Override
    public List<ScheduleResponseDTO> searchSchedule(ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        Pageable pageable = PageRequest.of(0, scheduleSearchRequestDTO.pageSize());
        if (scheduleSearchRequestDTO.scheduleId() == null) {
            return scheduleRepository.findAllByOrderByIdDesc(pageable).stream().map(ScheduleResponseDTO::fromEntity).toList();
        } else {
            return scheduleRepository.findAllByIdLessThanOrderByIdDesc(scheduleSearchRequestDTO.scheduleId(), pageable).stream().map(ScheduleResponseDTO::fromEntity).toList();
        }
        // TODO 날짜와 위치가 주어진 경우 로직 작성
    }

    @Override
    public List<ScheduleResponseDTO> getScheduleCalendarList(ScheduleCalendarRequestDTO scheduleCalendarRequestDTO) {
        return scheduleRepository.findAllByBuskingDate(scheduleCalendarRequestDTO.buskingDate()).stream().map(ScheduleResponseDTO::fromEntity).toList();
    }
}
