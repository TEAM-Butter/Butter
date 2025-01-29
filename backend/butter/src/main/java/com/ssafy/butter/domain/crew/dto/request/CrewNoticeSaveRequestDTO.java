package com.ssafy.butter.domain.crew.dto.request;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record CrewNoticeSaveRequestDTO(Long crewId, String title, String content, MultipartFile image, LocalDate createDate, LocalDate updateDate) {
}
