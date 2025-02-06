package com.ssafy.butter.domain.clip.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record ClipSaveRequestDTO(String title, Long liveId, MultipartFile video) {
}
