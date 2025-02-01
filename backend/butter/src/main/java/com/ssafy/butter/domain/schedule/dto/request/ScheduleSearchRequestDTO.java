package com.ssafy.butter.domain.schedule.dto.request;

import java.time.LocalDate;

public record ScheduleSearchRequestDTO(Long scheduleId, Integer pageSize, String keyword, LocalDate date, Double latitude, Double longitude) {
}
