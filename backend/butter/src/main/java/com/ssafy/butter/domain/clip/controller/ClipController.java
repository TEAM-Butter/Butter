package com.ssafy.butter.domain.clip.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipLikeRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipListRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import com.ssafy.butter.domain.clip.dto.response.ClipResponseDTO;
import com.ssafy.butter.domain.clip.service.ClipService;
import com.ssafy.butter.global.token.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/clip")
@Slf4j
public class ClipController {

    private final ClipService clipService;

    @PostMapping
    public ResponseEntity<?> createClip(@CurrentUser AuthInfoDTO currentUser, @ModelAttribute ClipSaveRequestDTO clipSaveRequestDTO) {
        ClipResponseDTO clipResponseDTO = clipService.createClip(currentUser, clipSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/clip/detail/" + clipResponseDTO.id())).body(clipResponseDTO);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getClipList(@ModelAttribute ClipListRequestDTO clipListRequestDTO) {
        return ResponseEntity.ok(clipService.getClipList(clipListRequestDTO));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getClipDetail(@PathVariable Long id) {
        return ResponseEntity.ok(clipService.getClipDetail(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClip(@CurrentUser AuthInfoDTO currentUser, @PathVariable Long id) {
        return ResponseEntity.ok(clipService.deleteClip(currentUser, id));
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeClip(@RequestBody ClipLikeRequestDTO likeRequestDTO) {
        clipService.likeClip(1L, likeRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/like/{id}")
    public ResponseEntity<?> unlikeClip(@PathVariable Long id) {
        clipService.unlikeClip(1L, id);
        return ResponseEntity.noContent().build();
    }
}
