package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.domain.crew.dto.request.CrewCreationRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewUpdateRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{crewId}/member/{memberId}")
    public ResponseEntity<?> deleteCrewMember(@PathVariable Long crewId, @PathVariable Long memberId) {
        log.info("deleteCrewMember: crewId: {}, memberId: {}", crewId, memberId);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getCrewList(CrewListRequestDTO crewListRequestDTO) {
        log.info("getCrewList: {}", crewListRequestDTO);
        return ResponseEntity.ok(null);
    }

    @PutMapping
    public ResponseEntity<?> updateCrew(@ModelAttribute CrewUpdateRequestDTO crewUpdateRequestDTO) {
        log.info("updateCrew: {}", crewUpdateRequestDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCrew(@PathVariable Long id) {
        log.info("deleteCrew: {}", id);
        return ResponseEntity.ok(null);
    }
}
