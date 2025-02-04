package com.ssafy.butter.domain.live.dto.request;

import jakarta.validation.constraints.NotNull;

public record LiveListRequestDTO(

        Long liveId,

        @NotNull
        Integer pageSize,

        @NotNull
        Integer searchType
) {
}
