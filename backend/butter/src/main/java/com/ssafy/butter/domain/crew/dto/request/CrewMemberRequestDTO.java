package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;

public record CrewMemberRequestDTO(

        @NotNull
        Long crewId,

        @NotNull
        Long memberId) {
}
