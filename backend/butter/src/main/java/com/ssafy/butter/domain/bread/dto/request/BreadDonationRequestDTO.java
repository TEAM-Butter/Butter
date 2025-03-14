package com.ssafy.butter.domain.bread.dto.request;

import jakarta.validation.constraints.NotNull;

public record BreadDonationRequestDTO(

        @NotNull
        Long crewId,

        @NotNull
        Integer amount
) {
}
