package com.ssafy.butter.domain.crew.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Getter
@ToString
public class CrewCreationRequestDTO {

    private String name;
    private String description;
    private MultipartFile image;
    private String promotionUrl;
    private MultipartFile portfolioVideo;
}
