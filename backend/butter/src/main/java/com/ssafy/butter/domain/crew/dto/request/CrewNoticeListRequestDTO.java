package com.ssafy.butter.domain.crew.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class CrewNoticeListRequestDTO {

    private String sortKey;
    private Integer pageNumber;
    private Integer pageSize;
}
