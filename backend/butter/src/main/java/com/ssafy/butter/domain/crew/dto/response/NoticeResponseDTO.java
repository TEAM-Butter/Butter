package com.ssafy.butter.domain.crew.dto.response;

import java.time.LocalDateTime;

public record NoticeResponseDTO(Long id, String title, String content, String imageUrl, LocalDateTime createDate, LocalDateTime updateDate) {
}
