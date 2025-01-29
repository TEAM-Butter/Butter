package com.ssafy.butter.domain.crew.dto.response;

import java.time.LocalDate;

public record CrewNoticeResponseDTO(Long id, String title, String content, String imageUrl, LocalDate createDate, LocalDate updateDate) {
}
