package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewNoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewNoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewNoticeResponseDTO;

import java.util.List;

public interface CrewNoticeService {

    CrewNoticeResponseDTO createCrewNotice(CrewNoticeSaveRequestDTO crewNoticeSaveRequestDTO);

    List<CrewNoticeResponseDTO> getCrewNoticeList(CrewNoticeListRequestDTO crewNoticeListRequestDTO);

    CrewNoticeResponseDTO getCrewNotice(Long id);
}
