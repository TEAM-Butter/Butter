package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.crew.entity.Crew;

import java.util.List;

public interface CrewService {

    CrewResponseDTO createCrew(AuthInfoDTO currentUser, CrewSaveRequestDTO crewSaveRequestDTO);

    void createCrewMember(AuthInfoDTO currentUser, CrewMemberRequestDTO crewMemberRequestDTO);

    void deleteCrewMember(AuthInfoDTO currentUser, Long crewId, Long memberId);

    List<CrewResponseDTO> getCrewList(CrewListRequestDTO crewListRequestDTO);

    CrewResponseDTO getCrewDetail(Long id);

    CrewResponseDTO updateCrew(AuthInfoDTO currentUser, Long id, CrewSaveRequestDTO crewSaveRequestDTO);

    CrewResponseDTO deleteCrew(AuthInfoDTO currentUser, Long id);

    void followCrew(AuthInfoDTO currentUser, CrewFollowRequestDTO crewFollowRequestDTO);

    void unfollowCrew(AuthInfoDTO currentUser, Long crewId);

    List<CrewResponseDTO> getRecommendedCrewList();

    Crew findById(Long id);
}
