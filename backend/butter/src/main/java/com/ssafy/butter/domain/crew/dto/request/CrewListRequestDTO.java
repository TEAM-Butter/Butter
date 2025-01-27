package com.ssafy.butter.domain.crew.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class CrewListRequestDTO {

    private Long crewId;
    private String keyword;
    private Integer pageSize;
    private Boolean isLiked;
}
