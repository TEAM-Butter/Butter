package com.ssafy.butter.auth.dto;

import java.time.LocalDate;

public record AuthInfoDTO(
        String email,
        String gender,
        LocalDate birthDate
) {
}
