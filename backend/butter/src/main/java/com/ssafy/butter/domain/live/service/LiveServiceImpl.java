package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.chat.service.ChatRoomService;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewMemberService;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveThumbnailRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;
import com.ssafy.butter.domain.live.dto.response.LiveThumbnailResponseDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.live.repository.LiveRepository;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.domain.notification.enums.NotificationType;
import com.ssafy.butter.domain.notification.service.NotificationService;
import com.ssafy.butter.domain.schedule.service.ScheduleService;
import com.ssafy.butter.infrastructure.awsS3.ImageUploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class LiveServiceImpl implements LiveService {

    private final MemberService memberService;
    private final CrewService crewService;
    private final ScheduleService scheduleService;
    private final ChatRoomService chatRoomService;
    private final NotificationService notificationService;
    private final ImageUploader imageUploader;

    private final LiveRepository liveRepository;

    @Override
    public LiveResponseDTO createLive(AuthInfoDTO currentUser, LiveSaveRequestDTO liveSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewService.findById(liveSaveRequestDTO.crewId());
        crewService.validateCrewAdmin(crew, member);
        if (crew.getLives().stream().anyMatch(live -> live.getEndDate() == null)) {
            throw new IllegalArgumentException("Crew already has active live");
        }
        Live live = Live.builder()
                .crew(crew)
                .title(liveSaveRequestDTO.title())
                .startDate(LocalDateTime.now())
                .schedule(liveSaveRequestDTO.scheduleId() == null ? null : scheduleService.findById(liveSaveRequestDTO.scheduleId()))
                .build();

        String content = "새로운 라이브: " + live.getTitle();
        String notificationType = NotificationType.SCHEDULE.getAlias();
        String url = NotificationType.SCHEDULE.getPath() + live.getId();
        notificationService.sendNotificationToFollowers(live.getCrew(), content, notificationType, url);

        return LiveResponseDTO.from(
                liveRepository.save(live),
                chatRoomService.getUserCount(crew.getId().toString()));
    }

    @Override
    public LiveResponseDTO getLiveDetail(Long id) {
        Live live = liveRepository.findById(id).orElseThrow();
        return LiveResponseDTO.from(live, chatRoomService.getUserCount(live.getCrew().getId().toString()));
    }

    @Override
    public List<LiveResponseDTO> getLiveList(LiveListRequestDTO liveListRequestDTO) {
        switch (liveListRequestDTO.sortBy()) {
            case "viewerCount":
                return getLiveListOrderByViewerCount(liveListRequestDTO);
            case "startDate":
                return getLiveListOrderByStartDate(liveListRequestDTO);
            default:
                return getLiveListOrderByStartDate(liveListRequestDTO);
        }
    }

    private List<LiveResponseDTO> getLiveListOrderByViewerCount(LiveListRequestDTO liveListRequestDTO) {
        List<Map.Entry<String, CopyOnWriteArraySet<String>>> sortedRoomSessions = chatRoomService.getRoomSessionsOrderBySessionCount();
        List<Live> activeLives = liveRepository.getActiveLiveList(liveListRequestDTO);
        log.info("sorted room session: {}", sortedRoomSessions);
        activeLives.forEach(live -> log.info("live id: {}", live.getCrew().getId()));
        List<LiveResponseDTO> liveResponseDTOs = new ArrayList<>();
        for (Map.Entry<String, CopyOnWriteArraySet<String>> roomSession : sortedRoomSessions) {
            for (Live activeLive : activeLives) {
                if (Long.parseLong(roomSession.getKey()) == activeLive.getCrew().getId()) {
                    liveResponseDTOs.add(LiveResponseDTO.from(activeLive, roomSession.getValue().size()));
                    break;
                }
            }
        }
        return liveResponseDTOs;
    }

    private List<LiveResponseDTO> getLiveListOrderByStartDate(LiveListRequestDTO liveListRequestDTO) {
        return liveRepository.getActiveLiveListOrderByStartDate(liveListRequestDTO).stream()
                .map(live -> LiveResponseDTO.from(live, chatRoomService.getUserCount(live.getCrew().getId().toString()))).toList();
    }

    @Override
    public Live findById(Long id) {
        return liveRepository.findById(id).orElseThrow();
    }

    @Override
    public void finishLive(AuthInfoDTO currentUser, Long id) {
        Crew crew = crewService.findById(id);
        Live live = liveRepository.findByCrewAndEndDateIsNull(crew).orElseThrow();
        Member member = memberService.findById(currentUser.id());
        crewService.validateCrewAdmin(crew, member);
        validateLiveFinished(live);
        live.updateEndDate(LocalDateTime.now());
        liveRepository.save(live);
    }

    @Override
    public LiveThumbnailResponseDTO updateLiveThumbnail(AuthInfoDTO currentUser, Long id, LiveThumbnailRequestDTO liveThumbnailRequestDTO) {
        Crew crew = crewService.findById(id);
        Live live = liveRepository.findByCrewAndEndDateIsNull(crew).orElseThrow();
        validateLiveFinished(live);
        Member member = memberService.findById(currentUser.id());
        crewService.validateCrewAdmin(crew, member);
        live.updateThumbnailUrl(imageUploader.uploadImage(liveThumbnailRequestDTO.thumbnail()));
        return LiveThumbnailResponseDTO.from(liveRepository.save(live));
    }

    private void validateLiveFinished(Live live) {
        if (live.getEndDate() != null) {
            throw new IllegalArgumentException("Live is already finished");
        }
    }
}