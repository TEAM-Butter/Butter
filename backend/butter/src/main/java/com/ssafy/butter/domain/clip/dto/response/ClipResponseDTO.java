package com.ssafy.butter.domain.clip.dto.response;

import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.crew.entity.Crew;
import lombok.Builder;

import java.util.List;

public record ClipResponseDTO(

        Long id,
        CrewDTO crew,
        String title,
        String videoName,
        String videoUrl,
        Long hitCount,
        Long likeCount,
        Boolean isLiked
) {
    @Builder
    public ClipResponseDTO(Long id, CrewDTO crew, String title, String videoName, String videoUrl, Long hitCount, Long likeCount, Boolean isLiked) {
        this.id = id;
        this.crew = crew;
        this.title = title;
        this.videoName = videoName;
        this.videoUrl = videoUrl;
        this.hitCount = hitCount;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }

    public static ClipResponseDTO from(Clip clip, Boolean isLiked) {
        return ClipResponseDTO.builder()
                .id(clip.getId())
                .crew( CrewDTO.fromEntity(clip.getCrew()))
                .title(clip.getTitle())
                .videoName(clip.getVideoName())
                .videoUrl(clip.getVideoUrl())
                .hitCount(clip.getHitCount())
                .isLiked(isLiked)
                .build();
    }

    public static ClipResponseDTO from(Clip clip, Boolean isLiked, Long likeCount) {
        return ClipResponseDTO.builder()
                .id(clip.getId())
                .crew( CrewDTO.fromEntity(clip.getCrew()))
                .title(clip.getTitle())
                .videoName(clip.getVideoName())
                .videoUrl(clip.getVideoUrl())
                .hitCount(clip.getHitCount())
                .likeCount(likeCount)
                .isLiked(isLiked)
                .build();
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
