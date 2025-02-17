package com.ssafy.butter.domain.live.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record LiveThumbnailRequestDTO(

        MultipartFile thumbnail
) {
}
