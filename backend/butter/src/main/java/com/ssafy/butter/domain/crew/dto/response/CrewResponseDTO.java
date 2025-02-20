package com.ssafy.butter.domain.crew.dto.response;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Notice;
import com.ssafy.butter.domain.live.dto.BaseLiveDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.schedule.dto.BaseScheduleDTO;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public record CrewResponseDTO(
        Long id,
        List<ScheduleDTO> schedules,
        List<Notice> notices,
        List<LiveDTO> lives,
        List<String> genres,
        List<CrewMemberResponseDTO> members,
        String name,
        String description,
        String imageUrl,
        String promotionUrl,
        LocalDateTime createDate,
        Long followerCount,
        Boolean isFollowed
) {

    public static CrewResponseDTO from(Crew crew, Boolean isFollowed, Long followerCount) {
        return new CrewResponseDTO(
                crew.getId(),
                crew.getSchedules() == null ? null : crew.getSchedules().stream().map(ScheduleDTO::new).toList(),
                crew.getNotices(),
                crew.getLives() == null ? null : crew.getLives().stream().map(LiveDTO::new).toList(),
                crew.getCrewGenres() == null ? null : crew.getCrewGenres().stream().map(crewGenre -> crewGenre.getGenre().getName()).toList(),
                crew.getCrewMembers() == null ? null : crew.getCrewMembers().stream().map(crewMember -> CrewMemberResponseDTO.from(crewMember.getMember())).toList(),
                crew.getName(),
                crew.getDescription(),
                crew.getImageUrl(),
                crew.getPromotionUrl(),
                crew.getCreateDate(),
                followerCount,
                isFollowed
        );
    }

    public static CrewResponseDTO from(Crew crew, Member creator, Boolean isFollowed, Long followerCount) {
        return new CrewResponseDTO(
                crew.getId(),
                crew.getSchedules() == null ? null : crew.getSchedules().stream().map(ScheduleDTO::new).toList(),
                crew.getNotices(),
                crew.getLives() == null ? null : crew.getLives().stream().map(LiveDTO::new).toList(),
                crew.getCrewGenres() == null ? null : crew.getCrewGenres().stream().map(crewGenre -> crewGenre.getGenre().getName()).toList(),
                List.of(CrewMemberResponseDTO.from(creator)),
                crew.getName(),
                crew.getDescription(),
                crew.getImageUrl(),
                crew.getPromotionUrl(),
                crew.getCreateDate(),
                followerCount,
                isFollowed
        );
    }

    @Getter
    private static class ScheduleDTO extends BaseScheduleDTO {

        private final BaseLiveDTO live;

        private ScheduleDTO(Schedule schedule) {
            super(schedule.getId(), schedule.getTitle(), schedule.getContent(), schedule.getPlace(),
                    schedule.getBuskingDate(), schedule.getLatitude(), schedule.getLongitude(),
                    schedule.getCreateDate(), schedule.getUpdateDate());
            this.live = schedule.getLive() == null ? null :
                    new BaseLiveDTO(schedule.getLive().getId(), schedule.getLive().getTitle(),
                    schedule.getLive().getStartDate(), schedule.getLive().getEndDate(), schedule.getLive().getThumbnailUrl());
        }
    }

    @Getter
    private static class LiveDTO extends BaseLiveDTO {

        private final BaseScheduleDTO schedule;

        private LiveDTO(Live live) {
            super(live.getId(), live.getTitle(), live.getStartDate(), live.getEndDate(), live.getThumbnailUrl());
            this.schedule = live.getSchedule() == null ? null :
                    new BaseScheduleDTO(live.getSchedule().getId(), live.getSchedule().getTitle(),
                    live.getSchedule().getContent(), live.getSchedule().getPlace(), live.getSchedule().getBuskingDate(),
                    live.getSchedule().getLatitude(), live.getSchedule().getLongitude(),
                    live.getSchedule().getCreateDate(), live.getSchedule().getUpdateDate());
        }
    }
}
