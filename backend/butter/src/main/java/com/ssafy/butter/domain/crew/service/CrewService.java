package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewSaveResponseDTO;

public interface CrewService {

    CrewSaveResponseDTO createCrew(CrewSaveRequestDTO crewSaveRequestDTO);
}
