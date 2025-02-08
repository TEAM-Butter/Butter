package com.ssafy.butter.domain.schedule.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.entity.Schedule;

import java.time.LocalDateTime;

public record ScheduleResponseDTO(
        Long id,
        CrewDTO crew,
        String title,
        String content,
        String place,
        LocalDateTime buskingDate,
        Double latitude,
        Double longitude,
        LocalDateTime createDate,
        LocalDateTime updateDate,
        LiveDTO live) {

    public static ScheduleResponseDTO fromEntity(Schedule schedule) {
        return new ScheduleResponseDTO(
                schedule.getId(),
                CrewDTO.fromEntity(schedule.getCrew()),
                schedule.getTitle(),
                schedule.getContent(),
                schedule.getPlace(),
                schedule.getBuskingDate(),
                schedule.getLatitude(),
                schedule.getLongitude(),
                schedule.getCreateDate(),
                schedule.getUpdateDate(),
                schedule.getLive() == null ? null : LiveDTO.fromEntity(schedule.getLive())
        );
    }

    public record CrewDTO(Long id, String name, String description, String imageUrl, String promotionUrl) {

        public static CrewDTO fromEntity(Crew crew) {
            return new CrewDTO(
                    crew.getId(),
                    crew.getName(),
                    crew.getDescription(),
                    crew.getImageUrl(),
                    crew.getPromotionUrl()
            );
        }
    }

    public record LiveDTO(Long id, String title, LocalDateTime startDate, LocalDateTime endDate) {

        public static LiveDTO fromEntity(Live live) {
            return new LiveDTO(
                    live.getId(),
                    live.getTitle(),
                    live.getStartDate(),
                    live.getEndDate()
            );
        }
    }
}
