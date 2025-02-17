package com.ssafy.butter.domain.bread.dto.request;

import jakarta.validation.constraints.NotNull;

public record BreadSettlementRequestDTO(

        @NotNull
        Long crewId,

        @NotNull
        Integer amount
) {

}
