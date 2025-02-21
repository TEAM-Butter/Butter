package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;

public record NoticeListRequestDTO(

        Long noticeId,

        @NotNull
        Long crewId,

        @NotNull
        Integer pageSize
) {
}
