package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;

public interface CrewService {

    CrewResponseDTO createCrew(CrewSaveRequestDTO crewSaveRequestDTO);

    void createCrewMember(CrewMemberRequestDTO crewMemberRequestDTO);

    void deleteCrewMember(Long crewId, Long memberId);
}
