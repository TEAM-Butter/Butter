package com.ssafy.butter.domain.schedule.dto.response;

import com.ssafy.butter.domain.schedule.entity.Schedule;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(Long id, Crew crew, String title, String content, String place, LocalDateTime buskingDate, Double latitude, Double longitude, LocalDateTime createDate, LocalDateTime updateDate) {

    public static ScheduleResponseDTO fromEntity(Schedule schedule) {
        return new ScheduleResponseDTO(
                schedule.getId(),
                Crew.fromEntity(schedule.getCrew()),
                schedule.getTitle(),
                schedule.getContent(),
                schedule.getPlace(),
                schedule.getBuskingDate(),
                schedule.getLatitude(),
                schedule.getLongitude(),
                schedule.getCreateDate(),
                schedule.getUpdateDate()
        );
    }

    public record Crew(Long id, String name, String description, String imageUrl, String promotionUrl) {

        public static Crew fromEntity(com.ssafy.butter.domain.crew.entity.Crew crew) {
            return new Crew(
                    crew.getId(),
                    crew.getName(),
                    crew.getDescription(),
                    crew.getImageUrl(),
                    crew.getPromotionUrl()
            );
        }
    }
}
