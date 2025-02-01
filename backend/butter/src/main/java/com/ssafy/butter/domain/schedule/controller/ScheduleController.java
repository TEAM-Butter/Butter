package com.ssafy.butter.domain.schedule.controller;

import com.ssafy.butter.domain.schedule.dto.request.ScheduleLikeRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/schedule")
@Slf4j
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        return ResponseEntity.ok(scheduleService.createSchedule(scheduleSaveRequestDTO));
    }

    @GetMapping
    public ResponseEntity<?> searchSchedule(@ModelAttribute ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        return ResponseEntity.ok(scheduleService.searchSchedule(scheduleSearchRequestDTO));
    }

    @GetMapping("/calendar-list")
    public ResponseEntity<?> getScheduleCalendarList(@ModelAttribute ScheduleRequestDTO scheduleRequestDTO) {
        log.info("Get schedule list: {}", scheduleRequestDTO);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getScheduleDetail(@PathVariable Long id) {
        log.info("Get schedule detail: {}", id);
        return ResponseEntity.ok(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long id, @ModelAttribute ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        log.info("Update schedule: {}", scheduleSaveRequestDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        log.info("Delete schedule: {}", id);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeSchedule(@RequestBody ScheduleLikeRequestDTO scheduleLikeRequestDTO) {
        log.info("Like schedule: {}", scheduleLikeRequestDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/like/{id}")
    public ResponseEntity<?> unlikeSchedule(@PathVariable Long id) {
        log.info("Unlike schedule: {}", id);
        return ResponseEntity.ok(null);
    }
}
