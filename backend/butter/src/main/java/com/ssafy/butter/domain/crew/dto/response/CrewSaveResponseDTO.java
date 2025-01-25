package com.ssafy.butter.domain.crew.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Getter
@ToString
public class CrewSaveResponseDTO {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String promotionUrl;
    private String portfolioVideoUrl;
}
