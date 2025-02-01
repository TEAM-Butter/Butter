package com.ssafy.butter.domain.live.controller;

import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/live")
@Slf4j
public class LiveController {

    @PostMapping
    public ResponseEntity<?> createLive(LiveSaveRequestDTO liveSaveRequestDTO) {
        log.info("Create live request: {}", liveSaveRequestDTO);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/watch/{id}")
    public ResponseEntity<?> getLiveDetail(@PathVariable Long id) {
        log.info("Watch live request: {}", id);
        return ResponseEntity.ok(null);
    }
}
