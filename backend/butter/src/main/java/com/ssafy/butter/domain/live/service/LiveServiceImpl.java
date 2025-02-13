package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.chat.service.ChatRoomService;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewMemberService;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.live.repository.LiveRepository;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.domain.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;

@RequiredArgsConstructor
@Service
@Transactional
public class LiveServiceImpl implements LiveService {

    private final MemberService memberService;
    private final CrewService crewService;
    private final CrewMemberService crewMemberService;
    private final ScheduleService scheduleService;
    private final ChatRoomService chatRoomService;

    private final LiveRepository liveRepository;

    @Override
    public LiveResponseDTO createLive(AuthInfoDTO currentUser, LiveSaveRequestDTO liveSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewService.findById(liveSaveRequestDTO.crewId());
        if (!crewMemberService.findByCrewAndMember(crew, member).getIsCrewAdmin()) {
            throw new IllegalArgumentException("Current user is not crew admin");
        }
        Live live = Live.builder()
                .crew(crew)
                .title(liveSaveRequestDTO.title())
                .startDate(liveSaveRequestDTO.startDate())
                .schedule(liveSaveRequestDTO.scheduleId() == null ? null : scheduleService.findById(liveSaveRequestDTO.scheduleId()))
                .build();
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
        List<Live> lives = liveRepository.getActiveLiveList(liveListRequestDTO);
        Map<Long, Integer> crewIdLiveIndices = new HashMap<>();
        for (int i = 0; i < lives.size(); i++) {
            crewIdLiveIndices.put(lives.get(i).getCrew().getId(), i);
        }
        List<LiveResponseDTO> liveResponseDTOs = new ArrayList<>();
        for (Map.Entry<String, CopyOnWriteArraySet<String>> roomSession : sortedRoomSessions) {
            Integer liveIndex = crewIdLiveIndices.get(Long.parseLong(roomSession.getKey()));
            if (liveIndex != null) {
                liveResponseDTOs.add(LiveResponseDTO.from(lives.get(liveIndex), roomSession.getValue().size()));
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
}
