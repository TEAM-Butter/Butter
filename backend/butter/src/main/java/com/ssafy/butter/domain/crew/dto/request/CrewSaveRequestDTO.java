package com.ssafy.butter.domain.crew.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record CrewSaveRequestDTO(String name, String description, MultipartFile image, String promotionUrl, MultipartFile portfolioVideo) {
}
