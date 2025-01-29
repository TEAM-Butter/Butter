package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewNoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewNoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewNoticeResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CrewNoticeServiceImpl implements CrewNoticeService {

    @Override
    public CrewNoticeResponseDTO createCrewNotice(CrewNoticeSaveRequestDTO crewNoticeSaveRequestDTO) {
        return new CrewNoticeResponseDTO(null, null, null, null, null, null);
    }

    @Override
    public List<CrewNoticeResponseDTO> getCrewNoticeList(CrewNoticeListRequestDTO crewNoticeListRequestDTO) {
        return List.of();
    }

    @Override
    public CrewNoticeResponseDTO getCrewNotice(Long id) {
        return new CrewNoticeResponseDTO(null, null, null, null, null, null);
    }

    @Override
    public CrewNoticeResponseDTO updateCrewNotice(Long id, CrewNoticeSaveRequestDTO crewNoticeSaveRequestDTO) {
        return new CrewNoticeResponseDTO(null, null, null, null, null, null);
    }

    @Override
    public CrewNoticeResponseDTO deleteCrewNotice(Long id) {
        return new CrewNoticeResponseDTO(null, null, null, null, null, null);
    }
}
