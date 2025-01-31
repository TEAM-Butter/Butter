package com.ssafy.butter.domain.crew.controller;

import com.ssafy.butter.domain.crew.dto.request.NoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.NoticeResponseDTO;
import com.ssafy.butter.domain.crew.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/crew/notice")
@Slf4j
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping
    public ResponseEntity<?> createCrewNotice(NoticeSaveRequestDTO noticeSaveRequestDTO) {
        NoticeResponseDTO noticeResponseDTO = noticeService.createCrewNotice(noticeSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/crew/notice/detail/" + noticeResponseDTO.id())).body(noticeResponseDTO);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getCrewNoticeList(@ModelAttribute NoticeListRequestDTO noticeListRequestDTO) {
        return ResponseEntity.ok(noticeService.getCrewNoticeList(noticeListRequestDTO));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getCrewNotice(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getCrewNotice(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCrewNotice(@PathVariable Long id, @RequestBody NoticeSaveRequestDTO noticeSaveRequestDTO) {
        return ResponseEntity.ok(noticeService.updateCrewNotice(id, noticeSaveRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCrewNotice(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.deleteCrewNotice(id));
    }
}
