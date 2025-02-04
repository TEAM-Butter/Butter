package com.ssafy.butter.domain.live.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.live.entity.Live;

import java.time.LocalDateTime;

public record LiveResponseDTO(Long id, CrewDTO crew, String title, LocalDateTime startDate, LocalDateTime endDate) {

    public static LiveResponseDTO fromEntity(Live live) {
        return new LiveResponseDTO(
                live.getId(),
                CrewDTO.fromEntity(live.getCrew()),
                live.getTitle(),
                live.getStartDate(),
                live.getEndDate()
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
}
