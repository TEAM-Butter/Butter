package com.ssafy.butter.domain.schedule.controller;

import com.ssafy.butter.domain.schedule.dto.request.ScheduleLikeRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleCalendarRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;
import com.ssafy.butter.domain.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/schedule")
@Slf4j
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        ScheduleResponseDTO scheduleResponseDTO = scheduleService.createSchedule(scheduleSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/schedule/detail/" + scheduleResponseDTO.id())).body(scheduleResponseDTO);
    }

    @GetMapping
    public ResponseEntity<?> searchSchedule(@ModelAttribute ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        return ResponseEntity.ok(scheduleService.searchSchedule(scheduleSearchRequestDTO));
    }

    @GetMapping("/calendar-list")
    public ResponseEntity<?> getScheduleCalendarList(@ModelAttribute ScheduleCalendarRequestDTO scheduleCalendarRequestDTO) {
        return ResponseEntity.ok(scheduleService.getScheduleCalendarList(scheduleCalendarRequestDTO));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getScheduleDetail(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleDetail(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long id, @ModelAttribute ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        return ResponseEntity.ok(scheduleService.updateSchedule(id, scheduleSaveRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.deleteSchedule(id));
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeSchedule(@RequestBody ScheduleLikeRequestDTO scheduleLikeRequestDTO) {
        scheduleService.likeSchedule(1L, scheduleLikeRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/like/{id}")
    public ResponseEntity<?> unlikeSchedule(@PathVariable Long id) {
        scheduleService.unlikeSchedule(1L, id);
        return ResponseEntity.noContent().build();
    }
}
