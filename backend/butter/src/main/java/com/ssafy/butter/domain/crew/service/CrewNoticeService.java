package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewNoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewNoticeResponseDTO;

public interface CrewNoticeService {

    CrewNoticeResponseDTO createCrewNotice(CrewNoticeSaveRequestDTO crewNoticeSaveRequestDTO);
}
