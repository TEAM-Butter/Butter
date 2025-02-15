package com.ssafy.butter.domain.clip.dto.response;

import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.crew.entity.Crew;

import java.util.List;

public record ClipResponseDTO(

        Long id,
        CrewDTO crew,
        String title,
        String videoName,
        Long hitCount,
        Boolean isLiked
) {

    public static ClipResponseDTO from(Clip clip, Boolean isLiked) {
        return new ClipResponseDTO(
                clip.getId(),
                CrewDTO.fromEntity(clip.getCrew()),
                clip.getTitle(),
                clip.getVideoName(),
                clip.getHitCount(),
                isLiked
        );
    }

    private record CrewDTO(Long id, String name, String description, String imageUrl, String promotionUrl, List<String> genres) {

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
}
