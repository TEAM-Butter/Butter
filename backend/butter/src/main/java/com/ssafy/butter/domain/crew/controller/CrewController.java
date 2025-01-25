package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
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
    public ResponseEntity<?> createCrew(@ModelAttribute CrewSaveRequestDTO crewSaveRequestDTO) {
        log.info("createCrew: {}", crewSaveRequestDTO);
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

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getCrewDetail(@PathVariable Long id) {
        log.info("getCrewDetail: {}", id);
        return ResponseEntity.ok(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCrew(@PathVariable Long id, @ModelAttribute CrewSaveRequestDTO crewSaveRequestDTO) {
        log.info("updateCrew: id: {}, crewSaveRequestDTO: {}", id, crewSaveRequestDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCrew(@PathVariable Long id) {
        log.info("deleteCrew: {}", id);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/follow")
    public ResponseEntity<?> followCrew(@ModelAttribute CrewFollowRequestDTO crewFollowRequestDTO) {
        log.info("followCrew: {}", crewFollowRequestDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<?> unfollowCrew(@PathVariable Long id) {
        log.info("unfollowCrew: {}", id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> getRecommendedCrew() {
        log.info("getRecommendedCrew");
        return ResponseEntity.ok(null);
    }
}
