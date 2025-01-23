package com.ssafy.butter.domain.crew.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class CrewMemberRequestDTO {

    private Long crewId;
    private Long memberId;
}
