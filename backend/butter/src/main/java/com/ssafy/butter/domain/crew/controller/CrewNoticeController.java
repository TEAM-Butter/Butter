package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.domain.crew.dto.request.CrewNoticeCreationRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/crew/notice")
@Slf4j
public class CrewNoticeController {

    @PostMapping
    public ResponseEntity<?> createCrewNotice(CrewNoticeCreationRequestDTO crewNoticeCreationRequestDTO) {
        log.info("CrewNotice crewNoticeCreationRequestDTO: {}", crewNoticeCreationRequestDTO);
        return ResponseEntity.ok(null);
    }
}
