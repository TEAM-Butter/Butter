package com.ssafy.butter.domain.live.dto.request;

import jakarta.validation.constraints.NotNull;

public record LiveListRequestDTO(

        Long liveId,
        String title,
        String crewName,
        String crewGenre,

        @NotNull
        Integer pageSize,

        @NotNull
        String sortBy
) {
}
