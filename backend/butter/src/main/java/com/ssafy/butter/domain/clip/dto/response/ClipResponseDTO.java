package com.ssafy.butter.domain.clip.dto.response;

import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;

public record ClipResponseDTO(LiveResponseDTO live, String title, String videoUrl, Long hitCount) {

    public static ClipResponseDTO fromEntity(Clip clip) {
        return new ClipResponseDTO(
                LiveResponseDTO.fromEntity(clip.getLive()),
                clip.getTitle(),
                clip.getVideoUrl(),
                clip.getHitCount()
        );
    }
}
