package com.ssafy.butter.domain.crew.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class CrewListRequestDTO {

    private String sortKey;
    private String keyword;
    private Integer pageNumber;
    private Integer pageSize;
    private Boolean isLiked;
}
