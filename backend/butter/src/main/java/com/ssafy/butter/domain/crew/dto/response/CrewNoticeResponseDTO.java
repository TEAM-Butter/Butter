package com.ssafy.butter.domain.crew.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Builder
@Getter
@ToString
public class CrewNoticeResponseDTO {

    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDate createDate;
    private LocalDate updateDate;
}
