package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.NoticeResponseDTO;
import com.ssafy.butter.domain.crew.service.NoticeService;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/crew/notice")
@Slf4j
@Tag(name = "Notice API", description = "크루 공지사항 관련 API")
public class NoticeController {

    private final NoticeService noticeService;

    @Operation(summary = "크루 공지사항 생성", description = "새로운 크루 공지사항을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "크루 공지사항 생성 성공")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createCrewNotice(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @Parameter(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @ModelAttribute NoticeSaveRequestDTO noticeSaveRequestDTO) {
        NoticeResponseDTO noticeResponseDTO = noticeService.createCrewNotice(currentUser, noticeSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/crew/notice/detail/" + noticeResponseDTO.id())).body(noticeResponseDTO);
    }

    @Operation(summary = "크루 공지사항 목록 조회", description = "크루 공지사항 목록을 조회합니다.")
    @GetMapping("/list")
    public ResponseEntity<?> getCrewNoticeList(
            @ParameterObject @ModelAttribute NoticeListRequestDTO noticeListRequestDTO) {
        return ResponseEntity.ok(noticeService.getCrewNoticeList(noticeListRequestDTO));
    }

    @Operation(summary = "크루 공지사항 상세 조회", description = "특정 크루 공지사항의 상세 정보를 조회합니다.")
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getCrewNotice(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getCrewNotice(id));
    }

    @Operation(summary = "크루 공지사항 수정", description = "기존 크루 공지사항의 정보를 수정합니다.")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateCrewNotice(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id,
            @Parameter(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @ModelAttribute NoticeSaveRequestDTO noticeSaveRequestDTO) {
        return ResponseEntity.ok(noticeService.updateCrewNotice(currentUser, id, noticeSaveRequestDTO));
    }

    @Operation(summary = "크루 공지사항 삭제", description = "특정 크루 공지사항을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCrewNotice(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id) {
        return ResponseEntity.ok(noticeService.deleteCrewNotice(currentUser, id));
    }
}
