package com.ssafy.butter.domain.live.dto.request;

import java.time.LocalDateTime;

public record LiveSaveRequestDTO(Long crewId, String title, LocalDateTime startTime) {
}
