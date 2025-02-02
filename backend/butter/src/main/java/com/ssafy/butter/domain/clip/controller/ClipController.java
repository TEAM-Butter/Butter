package com.ssafy.butter.domain.clip.controller;

import com.ssafy.butter.domain.clip.dto.request.ClipLikeRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipListRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ClipController {

    @PostMapping
    public ResponseEntity<?> createClip(@ModelAttribute ClipSaveRequestDTO clipSaveRequestDTO) {
        log.info("Create new clip: {}", clipSaveRequestDTO);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getClipList(@ModelAttribute ClipListRequestDTO clipListRequestDTO) {
        log.info("Get clip list: {}", clipListRequestDTO);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getClipDetail(@PathVariable Long id) {
        log.info("Get clip detail: {}", id);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClip(@PathVariable Long id) {
        log.info("Delete clip: {}", id);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeClip(@RequestBody ClipLikeRequestDTO likeRequestDTO) {
        log.info("Like clip: {}", likeRequestDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> unlikeClip(@PathVariable Long id) {
        log.info("Unlike clip: {}", id);
        return ResponseEntity.ok(null);
    }
}
