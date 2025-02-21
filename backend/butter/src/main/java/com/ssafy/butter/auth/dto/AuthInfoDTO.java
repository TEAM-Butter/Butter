package com.ssafy.butter.auth.dto;

import java.time.LocalDate;

public record AuthInfoDTO(
        Long id,
        String email,
        String gender,
        LocalDate birthDate
) {
}
