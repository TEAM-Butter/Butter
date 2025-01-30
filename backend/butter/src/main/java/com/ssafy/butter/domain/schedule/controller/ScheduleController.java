package com.ssafy.butter.domain.schedule.controller;

import com.ssafy.butter.domain.schedule.dto.request.ScheduleRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/schedule")
@Slf4j
public class ScheduleController {

    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        log.info("Create schedule: {}", scheduleSaveRequestDTO);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/calendar-list")
    public ResponseEntity<?> getScheduleList(@ModelAttribute ScheduleRequestDTO scheduleRequestDTO) {
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
}
