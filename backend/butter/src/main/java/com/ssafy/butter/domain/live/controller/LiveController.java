package com.ssafy.butter.domain.live.controller;

import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;
import com.ssafy.butter.domain.live.service.LiveService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/live")
@Slf4j
public class LiveController {

    private final LiveService liveService;

    @PostMapping
    public ResponseEntity<?> createLive(@RequestBody LiveSaveRequestDTO liveSaveRequestDTO) {
        LiveResponseDTO liveResponseDTO = liveService.createLive(liveSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/live/" + liveResponseDTO.id())).body(liveResponseDTO);
    }

    @GetMapping("/watch/{id}")
    public ResponseEntity<?> getLiveDetail(@PathVariable Long id) {
        return ResponseEntity.ok(liveService.getLiveDetail(id));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getLiveList(@ModelAttribute LiveListRequestDTO liveListRequestDTO) {
        return ResponseEntity.ok(liveService.getLiveList(liveListRequestDTO));
    }
}
