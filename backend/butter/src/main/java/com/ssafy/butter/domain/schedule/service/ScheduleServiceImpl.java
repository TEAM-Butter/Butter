package com.ssafy.butter.domain.schedule.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewMemberService;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.MemberService;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @Override
    public ScheduleResponseDTO createSchedule(AuthInfoDTO currentUser, ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewService.findById(scheduleSaveRequestDTO.crewId());
        if (!crewMemberService.findByCrewAndMember(crew, member).getIsCrewAdmin()) {
            throw new IllegalArgumentException("Current user is not crew admin");
        }
        Schedule schedule = Schedule.builder()
                .crew(crew)
                .title(scheduleSaveRequestDTO.title())
                .content(scheduleSaveRequestDTO.content())
                .place(scheduleSaveRequestDTO.place())
                .buskingDate(scheduleSaveRequestDTO.buskingDate())
                .latitude(scheduleSaveRequestDTO.latitude())
                .longitude(scheduleSaveRequestDTO.longitude())
                .build();
        return ScheduleResponseDTO.fromEntity(scheduleRepository.save(schedule));
    }

    @Override
    public List<ScheduleResponseDTO> searchSchedule(ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        Pageable pageable = PageRequest.of(0, scheduleSearchRequestDTO.pageSize());
        if (scheduleSearchRequestDTO.scheduleId() == null) {
            return scheduleRepository.findAllByOrderByIdDesc(pageable).stream().map(ScheduleResponseDTO::fromEntity).toList();
        } else {
            return scheduleRepository.findAllByIdLessThanOrderByIdDesc(scheduleSearchRequestDTO.scheduleId(), pageable).stream().map(ScheduleResponseDTO::fromEntity).toList();
        }
        // TODO 날짜와 위치가 주어진 경우 로직 작성
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
        if (!crewMemberService.findByCrewAndMember(crew, member).getIsCrewAdmin()) {
            throw new IllegalArgumentException("Current user is not crew admin");
        }
        Schedule schedule = scheduleRepository.findById(id).orElseThrow();
        schedule.update(scheduleSaveRequestDTO);
        return ScheduleResponseDTO.fromEntity(scheduleRepository.save(schedule));
    }

    @Override
    public ScheduleResponseDTO deleteSchedule(Long id) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow();
        scheduleRepository.delete(schedule);
        return ScheduleResponseDTO.fromEntity(schedule);
    }

    @Override
    public void likeSchedule(Long memberId, ScheduleLikeRequestDTO scheduleLikeRequestDTO) {
        Member member = memberService.findById(memberId);
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
    public void unlikeSchedule(Long memberId, Long scheduleId) {
        Member member = memberService.findById(memberId);
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow();
        LikedSchedule likedSchedule = likedScheduleRepository.findByMemberAndSchedule(member, schedule).orElseThrow();
        likedSchedule.updateIsLiked(false);
        likedScheduleRepository.save(likedSchedule);
    }
}
