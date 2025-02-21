package com.ssafy.butter.domain.live.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveThumbnailRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;
import com.ssafy.butter.domain.live.dto.response.LiveThumbnailResponseDTO;
import com.ssafy.butter.domain.live.service.LiveService;
import com.ssafy.butter.global.token.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.UnsupportedEncodingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("v1/live")
@Slf4j
@Tag(name = "Live API", description = "라이브 관련 API")
public class LiveController {

    private final LiveService liveService;

    @Operation(summary = "라이브 생성", description = "새로운 라이브를 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "라이브 생성 성공")
    })
    @PostMapping
    public ResponseEntity<LiveResponseDTO> createLive(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @RequestBody LiveSaveRequestDTO liveSaveRequestDTO) throws UnsupportedEncodingException {
        LiveResponseDTO liveResponseDTO = liveService.createLive(currentUser, liveSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/live/watch/" + liveResponseDTO.id())).body(liveResponseDTO);
    }

    @Operation(summary = "라이브 상세 조회", description = "특정 라이브의 상세 정보를 조회합니다.")
    @GetMapping("/watch/{id}")
    public ResponseEntity<LiveResponseDTO> getLiveDetail(@PathVariable Long id) {
        return ResponseEntity.ok(liveService.getLiveDetail(id));
    }

    @Operation(
            summary = "라이브 목록 조회",
            description = "라이브 목록을 조회합니다.<br>" +
                    "sortBy: viewerCount, startDate 중 하나")
    @GetMapping("/list")
    public ResponseEntity<List<LiveResponseDTO>> getLiveList(
            @ParameterObject @ModelAttribute LiveListRequestDTO liveListRequestDTO) {
        return ResponseEntity.ok(liveService.getLiveList(liveListRequestDTO));
    }

    @Operation(summary = "라이브 종료", description = "라이브를 종료합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "라이브 종료 성공")
    })
    @PatchMapping("/{id}")
    public ResponseEntity<List<LiveResponseDTO>> finishLive(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id) {
        liveService.finishLive(currentUser, id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "라이브 썸네일 수정", description = "라이브 썸네일을 수정합니다.")
    @PutMapping(value = "/{id}/thumbnail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<LiveThumbnailResponseDTO> updateLiveThumbnail(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id,
            @Parameter(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @ModelAttribute LiveThumbnailRequestDTO liveThumbnailRequestDTO) {
        return ResponseEntity.ok(liveService.updateLiveThumbnail(currentUser, id, liveThumbnailRequestDTO));
    }
}
