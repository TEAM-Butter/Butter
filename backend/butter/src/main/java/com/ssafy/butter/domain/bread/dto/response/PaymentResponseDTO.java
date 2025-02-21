package com.ssafy.butter.domain.bread.dto.response;

import jakarta.validation.constraints.NotNull;

public record PaymentResponseDTO(
    @NotNull
    String status
){
}
