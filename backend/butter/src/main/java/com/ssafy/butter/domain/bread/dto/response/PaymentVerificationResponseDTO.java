package com.ssafy.butter.domain.bread.dto.response;

import jakarta.validation.constraints.NotNull;

public record PaymentVerificationResponseDTO(
    @NotNull
    boolean success,
    @NotNull
    String message
){
}
