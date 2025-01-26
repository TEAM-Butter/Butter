package com.ssafy.butter.domain.crew.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Notice;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@ToString
public class CrewResponseDTO {

    private Long id;
    private List<Schedule> schedules;
    private List<Notice> notices;
    private List<Live> lives;
    private String name;
    private String description;
    private String imageUrl;
    private String promotionUrl;
    private String portfolioVideoUrl;

    public static CrewResponseDTO fromEntity(Crew crew) {
        return builder()
                .id(crew.getId())
                .schedules(crew.getSchedules())
                .notices(crew.getNotices())
                .lives(crew.getLives())
                .name(crew.getName())
                .description(crew.getDescription())
                .imageUrl(crew.getImageUrl())
                .promotionUrl(crew.getPromotionUrl())
                .portfolioVideoUrl(crew.getPortfolioVideoUrl())
                .build();
    }
}
