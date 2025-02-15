package com.ssafy.butter.domain.schedule.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.dto.BaseScheduleDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ScheduleResponseDTO extends BaseScheduleDTO {

    private final CrewDTO crew;
    private final LiveDTO live;
    private final Boolean isLiked;

    public ScheduleResponseDTO(Schedule schedule, Boolean isLiked) {
        super(schedule.getId(), schedule.getTitle(), schedule.getContent(), schedule.getPlace(),
                schedule.getBuskingDate(), schedule.getLatitude(), schedule.getLongitude(), schedule.getCreateDate(),
                schedule.getUpdateDate());
        this.crew = CrewDTO.fromEntity(schedule.getCrew());
        this.live = LiveDTO.fromEntity(schedule.getLive());
        this.isLiked = isLiked;
    }

    private record CrewDTO(Long id, String name, String description, String imageUrl, String promotionUrl) {

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

    private record LiveDTO(Long id, String title, LocalDateTime startDate, LocalDateTime endDate) {

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
