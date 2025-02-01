package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.live.repository.LiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class LiveServiceImpl implements LiveService {

    private final CrewService crewService;

    private final LiveRepository liveRepository;

    @Override
    public LiveResponseDTO createLive(LiveSaveRequestDTO liveSaveRequestDTO) {
        Live live = Live.builder()
                .crew(crewService.findById(liveSaveRequestDTO.crewId()))
                .title(liveSaveRequestDTO.title())
                .startDate(liveSaveRequestDTO.startDate())
                .build();
        return LiveResponseDTO.fromEntity(liveRepository.save(live));
    }
}
