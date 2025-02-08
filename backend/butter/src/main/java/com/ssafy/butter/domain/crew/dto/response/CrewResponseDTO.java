package com.ssafy.butter.domain.crew.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Notice;
import com.ssafy.butter.domain.live.dto.BaseLiveDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.schedule.dto.BaseScheduleDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.Getter;

import java.util.List;

public record CrewResponseDTO(
        Long id,
        List<ScheduleDTO> schedules,
        List<Notice> notices,
        List<LiveDTO> lives,
        String name,
        String description,
        String imageUrl,
        String promotionUrl
) {

    public static CrewResponseDTO fromEntity(Crew crew) {
        return new CrewResponseDTO(
                crew.getId(),
                crew.getSchedules() == null ? null : crew.getSchedules().stream().map(ScheduleDTO::new).toList(),
                crew.getNotices(),
                crew.getLives() == null ? null : crew.getLives().stream().map(LiveDTO::new).toList(),
                crew.getName(),
                crew.getDescription(),
                crew.getImageUrl(),
                crew.getPromotionUrl()
        );
    }

    @Getter
    private static class ScheduleDTO extends BaseScheduleDTO {

        private final BaseLiveDTO live;

        private ScheduleDTO(Schedule schedule) {
            super(schedule.getId(), schedule.getTitle(), schedule.getContent(), schedule.getPlace(),
                    schedule.getBuskingDate(), schedule.getLatitude(), schedule.getLongitude());
            this.live = schedule.getLive() == null ? null :
                    new BaseLiveDTO(schedule.getLive().getId(), schedule.getLive().getTitle(),
                    schedule.getLive().getStartDate(), schedule.getLive().getEndDate());
        }
    }

    @Getter
    private static class LiveDTO extends BaseLiveDTO {

        private final BaseScheduleDTO schedule;

        private LiveDTO(Live live) {
            super(live.getId(), live.getTitle(), live.getStartDate(), live.getEndDate());
            this.schedule = live.getSchedule() == null ? null :
                    new BaseScheduleDTO(live.getSchedule().getId(), live.getSchedule().getTitle(),
                    live.getSchedule().getContent(), live.getSchedule().getPlace(), live.getSchedule().getBuskingDate(),
                    live.getSchedule().getLatitude(), live.getSchedule().getLongitude());
        }
    }
}
