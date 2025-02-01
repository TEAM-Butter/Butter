package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.live.repository.LiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Override
    public LiveResponseDTO getLiveDetail(Long id) {
        return LiveResponseDTO.fromEntity(liveRepository.findById(id).orElseThrow());
    }

    @Override
    public List<LiveResponseDTO> getLiveList(LiveListRequestDTO liveListRequestDTO) {
        Pageable pageable = PageRequest.of(0, liveListRequestDTO.pageSize());
        if (liveListRequestDTO.id() == null) {
            return liveRepository.findAllByOrderByIdDesc(pageable).stream().map(LiveResponseDTO::fromEntity).toList();
        } else {
            return liveRepository.findAllByIdLessThanOrderByIdDesc(liveListRequestDTO.id(), pageable).stream().map(LiveResponseDTO::fromEntity).toList();
        }
        // TODO search type에 따른 처리 로직 추가
    }
}
