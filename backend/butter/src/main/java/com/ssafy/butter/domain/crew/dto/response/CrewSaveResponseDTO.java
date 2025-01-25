package com.ssafy.butter.domain.crew.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
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
