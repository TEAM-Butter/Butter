package com.ssafy.butter.domain.clip.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipLikeRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipListRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import com.ssafy.butter.domain.clip.dto.response.ClipResponseDTO;
import com.ssafy.butter.domain.clip.service.ClipService;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/clip")
@Slf4j
@Tag(name = "Clip API", description = "클립 관련 API")
public class ClipController {

    private final ClipService clipService;

    @Operation(summary = "클립 생성", description = "새로운 클립을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "클립 생성 성공")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ClipResponseDTO> createClip(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @Parameter(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @ModelAttribute ClipSaveRequestDTO clipSaveRequestDTO) {
        ClipResponseDTO clipResponseDTO = clipService.createClip(currentUser, clipSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/clip/detail/" + clipResponseDTO.id())).body(clipResponseDTO);
    }

    @Operation(summary = "클립 목록 조회", description = "클립 목록을 조회합니다.")
    @GetMapping("/list")
    public ResponseEntity<List<ClipResponseDTO>> getClipList(
            @ParameterObject @ModelAttribute ClipListRequestDTO clipListRequestDTO) {
        return ResponseEntity.ok(clipService.getClipList(clipListRequestDTO));
    }

    @Operation(summary = "클립 상세 조회", description = "특정 클립의 상세 정보를 조회합니다.")
    @GetMapping("/detail/{id}")
    public ResponseEntity<ClipResponseDTO> getClipDetail(@PathVariable Long id) {
        return ResponseEntity.ok(clipService.getClipDetail(id));
    }

    @Operation(summary = "클립 삭제", description = "특정 클립을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<ClipResponseDTO> deleteClip(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser, @PathVariable Long id) {
        return ResponseEntity.ok(clipService.deleteClip(currentUser, id));
    }

    @Operation(summary = "클립 좋아요 등록", description = "클립 좋아요를 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "좋아요 등록 성공")
    })
    @PostMapping("/like")
    public ResponseEntity<Void> likeClip(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @RequestBody ClipLikeRequestDTO likeRequestDTO) {
        clipService.likeClip(currentUser, likeRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "클립 좋아요 해제", description = "클립 좋아요를 해제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "좋아요 해제 성공")
    })
    @DeleteMapping("/like/{id}")
    public ResponseEntity<Void> unlikeClip(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id) {
        clipService.unlikeClip(currentUser, id);
        return ResponseEntity.noContent().build();
    }
}
