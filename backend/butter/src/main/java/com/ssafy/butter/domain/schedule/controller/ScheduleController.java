package com.ssafy.butter.domain.schedule.controller;

import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
