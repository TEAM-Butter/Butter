package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;

import java.util.List;

public interface CrewService {

    CrewResponseDTO createCrew(CrewSaveRequestDTO crewSaveRequestDTO);

    void createCrewMember(CrewMemberRequestDTO crewMemberRequestDTO);

    void deleteCrewMember(Long crewId, Long memberId);

    List<CrewResponseDTO> getCrewList(CrewListRequestDTO crewListRequestDTO);

    CrewResponseDTO getCrewDetail(Long id);

    CrewResponseDTO updateCrew(Long id, CrewMemberRequestDTO crewMemberRequestDTO);

    CrewResponseDTO deleteCrew(Long id);

    void followCrew(CrewFollowRequestDTO crewFollowRequestDTO);

    void unfollowCrew(Long crewId);
}
