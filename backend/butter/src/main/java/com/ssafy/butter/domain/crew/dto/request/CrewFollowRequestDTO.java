package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;

public record CrewFollowRequestDTO(

        @NotNull
        Long crewId
) {
}
