package com.ssafy.butter.domain.schedule.dto.request;

import java.time.LocalDateTime;

public record ScheduleSaveRequestDTO(Long crewId, LocalDateTime buskingDate, LocalDateTime createDate, LocalDateTime updateDate, String title, String content, String place, Double latitude, Double longitude) {
}
