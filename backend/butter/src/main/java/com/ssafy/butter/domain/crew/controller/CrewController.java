package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewGenreRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.global.token.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("v1/crew")
@Tag(name = "Crew API", description = "크루 관련 API")
public class CrewController {

    private final CrewService crewService;

    @Operation(summary = "크루 생성", description = "새로운 크루를 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "크루 생성 성공")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CrewResponseDTO> createCrew(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @Parameter(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @ModelAttribute CrewSaveRequestDTO crewSaveRequestDTO) {
        CrewResponseDTO crewResponseDTO = crewService.createCrew(currentUser, crewSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/crew/detail/" + crewResponseDTO.id())).body(crewResponseDTO);
    }

    @Operation(summary = "크루 멤버 추가", description = "크루에 새로운 멤버를 추가합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "크루 멤버 추가 성공")
    })
    @PostMapping("/member")
    public ResponseEntity<Void> createCrewMember(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @RequestBody CrewMemberRequestDTO crewMemberRequestDTO) {
        crewService.createCrewMember(currentUser, crewMemberRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "크루 멤버 삭제", description = "크루에서 특정 멤버를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "크루 멤버 삭제 성공")
    })
    @DeleteMapping("/{crewId}/member/{memberId}")
    public ResponseEntity<Void> deleteCrewMember(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long crewId,
            @PathVariable Long memberId) {
        crewService.deleteCrewMember(currentUser, crewId, memberId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "크루 목록 조회", description = "크루 목록을 조회합니다.")
    @GetMapping("/list")
    public ResponseEntity<List<CrewResponseDTO>> getCrewList(
            @ParameterObject @ModelAttribute CrewListRequestDTO crewListRequestDTO) {
        return ResponseEntity.ok(crewService.getCrewList(crewListRequestDTO));
    }

    @Operation(summary = "크루 상세 조회", description = "특정 크루의 상세 정보를 조회합니다.")
    @GetMapping("/detail/{id}")
    public ResponseEntity<CrewResponseDTO> getCrewDetail(@PathVariable Long id) {
        return ResponseEntity.ok(crewService.getCrewDetail(id));
    }

    @Operation(summary = "크루 수정", description = "기존 크루의 정보를 수정합니다.")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CrewResponseDTO> updateCrew(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id,
            @Parameter(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @ModelAttribute CrewSaveRequestDTO crewSaveRequestDTO) {
        return ResponseEntity.ok(crewService.updateCrew(currentUser, id, crewSaveRequestDTO));
    }

    @Operation(summary = "크루 삭제", description = "특정 크루를 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<CrewResponseDTO> deleteCrew(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id) {
        return ResponseEntity.ok(crewService.deleteCrew(currentUser, id));
    }

    @Operation(summary = "크루 팔로우", description = "크루를 팔로우합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "팔로우 성공")
    })
    @PostMapping("/follow")
    public ResponseEntity<Void> followCrew(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @RequestBody CrewFollowRequestDTO crewFollowRequestDTO) {
        crewService.followCrew(currentUser, crewFollowRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "크루 언팔로우", description = "크루 팔로우를 취소합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "언팔로우 성공")
    })
    @DeleteMapping("/{id}/follow")
    public ResponseEntity<Void> unfollowCrew(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id) {
        crewService.unfollowCrew(currentUser, id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "크루 장르 수정", description = "크루의 장르를 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "장르 수정 성공")
    })
    @PutMapping("/{id}/genre")
    public ResponseEntity<Void> updateCrewGenre(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser, @PathVariable Long id,
            @RequestBody CrewGenreRequestDTO crewGenreRequestDTO) {
        crewService.createCrewGenre(currentUser, id, crewGenreRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "추천 크루 목록 조회", description = "추천 크루 목록을 조회합니다.")
    @GetMapping("/recommend")
    public ResponseEntity<List<CrewResponseDTO>> getRecommendedCrewList() {
        log.info("getRecommendedCrewList");
        return ResponseEntity.ok(null);
    }
}
