package com.ssafy.butter.domain.bread.dto.request;

import jakarta.validation.constraints.NotNull;

public record BreadRechargeRequestDTO(
    @NotNull
    String impUid
){
}
