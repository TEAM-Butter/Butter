package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.domain.crew.dto.request.CrewCreationRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/crew")
@Slf4j
public class CrewController {

    @PostMapping
    public ResponseEntity<?> createCrew(@ModelAttribute CrewCreationRequestDTO crewCreationRequestDTO) {
        log.info("createCrew: {}", crewCreationRequestDTO);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/member")
    public ResponseEntity<?> createCrewMember(@ModelAttribute CrewMemberRequestDTO crewMemberRequestDTO) {
        log.info("createCrewMember: {}", crewMemberRequestDTO);
        return ResponseEntity.ok(null);
    }
}
