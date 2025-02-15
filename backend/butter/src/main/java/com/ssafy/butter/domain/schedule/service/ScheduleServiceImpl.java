package com.ssafy.butter.domain.schedule.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewMemberService;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.domain.notification.enums.NotificationType;
import com.ssafy.butter.domain.notification.service.NotificationService;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleCalendarRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleLikeRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;
import com.ssafy.butter.domain.schedule.entity.LikedSchedule;
import com.ssafy.butter.domain.schedule.entity.Schedule;
import com.ssafy.butter.domain.schedule.repository.LikedScheduleRepository;
import com.ssafy.butter.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final LikedScheduleRepository likedScheduleRepository;

    private final MemberService memberService;
    private final CrewService crewService;
    private final CrewMemberService crewMemberService;
    private final NotificationService notificationService;

    @Override
    public ScheduleResponseDTO createSchedule(AuthInfoDTO currentUser, ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewService.findById(scheduleSaveRequestDTO.crewId());
        crewService.validateCrewAdmin(crew, member);
        Schedule schedule = Schedule.builder()
                .crew(crew)
                .title(scheduleSaveRequestDTO.title())
                .content(scheduleSaveRequestDTO.content())
                .place(scheduleSaveRequestDTO.place())
                .buskingDate(scheduleSaveRequestDTO.buskingDate())
                .latitude(scheduleSaveRequestDTO.latitude())
                .longitude(scheduleSaveRequestDTO.longitude())
                .build();

        String content = "새로운 일정: " + schedule.getTitle();
        String notificationType = NotificationType.SCHEDULE.getAlias();
        String url = NotificationType.SCHEDULE.getPath() + schedule.getId();
        notificationService.sendNotificationToFollowers(schedule.getCrew(), content, notificationType, url);

        return ScheduleResponseDTO.fromEntity(scheduleRepository.save(schedule));
    }

    @Override
    public List<ScheduleResponseDTO> searchSchedule(ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        return scheduleRepository.getScheduleList(scheduleSearchRequestDTO).stream().map(ScheduleResponseDTO::fromEntity).toList();
    }

    @Override
    public List<ScheduleResponseDTO> getScheduleCalendarList(ScheduleCalendarRequestDTO scheduleCalendarRequestDTO) {
        return scheduleRepository.findAllByBuskingDate(scheduleCalendarRequestDTO.buskingDate()).stream().map(ScheduleResponseDTO::fromEntity).toList();
    }

    @Override
    public ScheduleResponseDTO getScheduleDetail(Long id) {
        return scheduleRepository.findById(id).map(ScheduleResponseDTO::fromEntity).orElseThrow();
    }

    @Override
    public ScheduleResponseDTO updateSchedule(AuthInfoDTO currentUser, Long id, ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewService.findById(scheduleSaveRequestDTO.crewId());
        crewService.validateCrewAdmin(crew, member);
        Schedule schedule = scheduleRepository.findById(id).orElseThrow();
        schedule.update(scheduleSaveRequestDTO);
        return ScheduleResponseDTO.fromEntity(scheduleRepository.save(schedule));
    }

    @Override
    public ScheduleResponseDTO deleteSchedule(AuthInfoDTO currentUser, Long id) {
        Member member = memberService.findById(currentUser.id());
        Schedule schedule = scheduleRepository.findById(id).orElseThrow();
        Crew crew = schedule.getCrew();
        crewService.validateCrewAdmin(crew, member);
        scheduleRepository.delete(schedule);
        return ScheduleResponseDTO.fromEntity(schedule);
    }

    @Override
    public void likeSchedule(AuthInfoDTO currentUser, ScheduleLikeRequestDTO scheduleLikeRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Schedule schedule = scheduleRepository.findById(scheduleLikeRequestDTO.scheduleId()).orElseThrow();
        likedScheduleRepository.findByMemberAndSchedule(member, schedule).ifPresentOrElse(likedSchedule -> {
            if (likedSchedule.getIsLiked()) {
                throw new IllegalArgumentException("Already liked schedule");
            }
            likedSchedule.updateIsLiked(true);
            likedScheduleRepository.save(likedSchedule);
        }, () -> {
            likedScheduleRepository.save(LikedSchedule.builder()
                    .member(member)
                    .schedule(schedule)
                    .isLiked(true)
                    .build());
        });
    }

    @Override
    public void unlikeSchedule(AuthInfoDTO currentUser, Long scheduleId) {
        Member member = memberService.findById(currentUser.id());
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow();
        LikedSchedule likedSchedule = likedScheduleRepository.findByMemberAndSchedule(member, schedule).orElseThrow();
        if (!likedSchedule.getIsLiked()) {
            throw new IllegalArgumentException("Already unliked schedule");
        }
        likedSchedule.updateIsLiked(false);
        likedScheduleRepository.save(likedSchedule);
    }

    @Override
    public Schedule findById(Long id) {
        return scheduleRepository.findById(id).orElseThrow();
    }

    @Override
    public List<ScheduleResponseDTO> getLikedScheduleList(AuthInfoDTO currentUser) {
        return scheduleRepository.getLikedScheduleList(currentUser.id()).stream()
                .map(ScheduleResponseDTO::fromEntity).toList();
    }
}
