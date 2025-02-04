package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;

public record CrewListRequestDTO(

        Long crewId,
        String keyword,

        @NotNull
        Integer pageSize
) {
}
