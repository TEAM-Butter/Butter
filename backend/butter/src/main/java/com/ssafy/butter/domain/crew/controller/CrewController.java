package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.global.token.CurrentUser;
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
    public ResponseEntity<?> createCrew(@CurrentUser AuthInfoDTO currentUser, @ModelAttribute CrewSaveRequestDTO crewSaveRequestDTO) {
        CrewResponseDTO crewResponseDTO = crewService.createCrew(currentUser, crewSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/crew/detail/" + crewResponseDTO.id())).body(crewResponseDTO);
    }

    @PostMapping("/member")
    public ResponseEntity<?> createCrewMember(@CurrentUser AuthInfoDTO currentUser, @RequestBody CrewMemberRequestDTO crewMemberRequestDTO) {
        crewService.createCrewMember(currentUser, crewMemberRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{crewId}/member/{memberId}")
    public ResponseEntity<?> deleteCrewMember(@CurrentUser AuthInfoDTO currentUser, @PathVariable Long crewId, @PathVariable Long memberId) {
        crewService.deleteCrewMember(currentUser, crewId, memberId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public ResponseEntity<?> getCrewList(@ModelAttribute CrewListRequestDTO crewListRequestDTO) {
        return ResponseEntity.ok(crewService.getCrewList(crewListRequestDTO));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getCrewDetail(@PathVariable Long id) {
        return ResponseEntity.ok(crewService.getCrewDetail(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCrew(@CurrentUser AuthInfoDTO currentUser, @PathVariable Long id, @ModelAttribute CrewSaveRequestDTO crewSaveRequestDTO) {
        return ResponseEntity.ok(crewService.updateCrew(currentUser, id, crewSaveRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCrew(@CurrentUser AuthInfoDTO currentUser, @PathVariable Long id) {
        return ResponseEntity.ok(crewService.deleteCrew(currentUser, id));
    }

    @PostMapping("/follow")
    public ResponseEntity<?> followCrew(@CurrentUser AuthInfoDTO currentUser, @RequestBody CrewFollowRequestDTO crewFollowRequestDTO) {
        crewService.followCrew(currentUser, crewFollowRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<?> unfollowCrew(@CurrentUser AuthInfoDTO currentUser, @PathVariable Long id) {
        crewService.unfollowCrew(currentUser, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> getRecommendedCrewList() {
        log.info("getRecommendedCrewList");
        return ResponseEntity.ok(null);
    }
}
