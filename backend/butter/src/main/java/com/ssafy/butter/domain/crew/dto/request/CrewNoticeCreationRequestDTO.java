package com.ssafy.butter.domain.crew.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
@ToString
public class CrewNoticeCreationRequestDTO {

    private Long crewId;
    private String title;
    private String content;
    private MultipartFile image;
    private LocalDate createDate;
    private LocalDate updateDate;
}
