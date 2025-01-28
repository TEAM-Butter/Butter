package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.crew.service.CrewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/crew")
@Slf4j
public class CrewController {

    private final CrewService crewService;

    @PostMapping
    public ResponseEntity<?> createCrew(@ModelAttribute CrewSaveRequestDTO crewSaveRequestDTO) {
        CrewResponseDTO crewResponseDTO = crewService.createCrew(crewSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/crew/detail/" + crewResponseDTO.getId())).body(crewResponseDTO);
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
    public ResponseEntity<?> getCrewList(@ModelAttribute CrewListRequestDTO crewListRequestDTO) {
        return ResponseEntity.ok(crewListRequestDTO.getIsLiked() ? null : crewService.getCrewList(crewListRequestDTO));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getCrewDetail(@PathVariable Long id) {
        return ResponseEntity.ok(crewService.getCrewDetail(id));
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
    public ResponseEntity<?> followCrew(@RequestBody CrewFollowRequestDTO crewFollowRequestDTO) {
        log.info("followCrew: {}", crewFollowRequestDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<?> unfollowCrew(@PathVariable Long id) {
        log.info("unfollowCrew: {}", id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> getRecommendedCrewList() {
        log.info("getRecommendedCrewList");
        return ResponseEntity.ok(null);
    }
}
