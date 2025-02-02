package com.ssafy.butter.domain.clip.controller;

import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ClipController {

    @PostMapping
    public ResponseEntity<?> createClip(@ModelAttribute ClipSaveRequestDTO clipSaveRequestDTO) {
        log.info("Create new clip: {}", clipSaveRequestDTO);
        return ResponseEntity.ok(null);
    }
}
