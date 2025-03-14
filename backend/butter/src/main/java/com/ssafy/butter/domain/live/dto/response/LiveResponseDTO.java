package com.ssafy.butter.domain.live.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.entity.Schedule;

import java.time.LocalDateTime;
import java.util.List;

public record LiveResponseDTO(
        Long id,
        CrewDTO crew,
        String title,
        Integer viewerCount,
        LocalDateTime startDate,
        LocalDateTime endDate,
        ScheduleDTO schedule,
        String thumbnailUrl
) {

    public static LiveResponseDTO from(Live live, Integer viewerCount) {
        return new LiveResponseDTO(
                live.getId(),
                CrewDTO.fromEntity(live.getCrew()),
                live.getTitle(),
                viewerCount,
                live.getStartDate(),
                live.getEndDate(),
                live.getSchedule() == null ? null : ScheduleDTO.fromEntity(live.getSchedule()),
                live.getThumbnailUrl()
        );
    }

    public record CrewDTO(Long id, String name, String description, String imageUrl, String promotionUrl, List<String> genres) {

        public static CrewDTO fromEntity(Crew crew) {
            return new CrewDTO(
                    crew.getId(),
                    crew.getName(),
                    crew.getDescription(),
                    crew.getImageUrl(),
                    crew.getPromotionUrl(),
                    crew.getCrewGenres().stream().map(crewGenre -> crewGenre.getGenre().getName()).toList()
            );
        }
    }

    public record ScheduleDTO(String title, String content, String place, LocalDateTime buskingDate) {

        public static ScheduleDTO fromEntity(Schedule schedule) {
            return new ScheduleDTO(
                    schedule.getTitle(),
                    schedule.getContent(),
                    schedule.getPlace(),
                    schedule.getBuskingDate()
            );
        }
    }
}
