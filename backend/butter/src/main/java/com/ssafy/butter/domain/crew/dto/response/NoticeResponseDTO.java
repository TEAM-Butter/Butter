package com.ssafy.butter.domain.crew.dto.response;

import com.ssafy.butter.domain.crew.entity.Notice;

import java.time.LocalDateTime;

public record NoticeResponseDTO(Long id, String title, String content, String imageUrl, LocalDateTime createDate, LocalDateTime updateDate) {

    public static NoticeResponseDTO fromEntity(Notice notice) {
        return new NoticeResponseDTO(
                notice.getId(),
                notice.getTitle(),
                notice.getContent(),
                notice.getImageUrl(),
                notice.getCreateDate(),
                notice.getUpdateDate()
        );
    }
}
