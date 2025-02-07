package com.ssafy.butter.domain.crew.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Notice;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.entity.Schedule;

import java.util.List;

public record CrewResponseDTO(Long id, List<Schedule> schedules, List<Notice> notices, List<Live> lives, String name, String description, String imageUrl, String promotionUrl) {

    public static CrewResponseDTO fromEntity(Crew crew) {
        return new CrewResponseDTO(
                crew.getId(),
                crew.getSchedules(),
                crew.getNotices(),
                crew.getLives(),
                crew.getName(),
                crew.getDescription(),
                crew.getImageUrl(),
                crew.getPromotionUrl()
        );
    }
}
