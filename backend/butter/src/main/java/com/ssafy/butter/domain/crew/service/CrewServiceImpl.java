package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CrewServiceImpl implements CrewService {

    @Override
    public CrewResponseDTO createCrew(CrewSaveRequestDTO crewSaveRequestDTO) {
        return CrewResponseDTO.builder()
                .id(null)
                .name(null)
                .description(null)
                .imageUrl(null)
                .promotionUrl(null)
                .portfolioVideoUrl(null)
                .build();
    }

    @Override
    public void createCrewMember(CrewMemberRequestDTO crewMemberRequestDTO) {

    }

    @Override
    public void deleteCrewMember(Long crewId, Long memberId) {

    }

    @Override
    public List<CrewResponseDTO> getCrewList(CrewListRequestDTO crewListRequestDTO) {
        return List.of();
    }

    @Override
    public CrewResponseDTO getCrewDetail(Long id) {
        return CrewResponseDTO.builder()
                .id(null)
                .name(null)
                .description(null)
                .imageUrl(null)
                .promotionUrl(null)
                .portfolioVideoUrl(null)
                .build();
    }

    @Override
    public CrewResponseDTO updateCrew(Long id, CrewMemberRequestDTO crewMemberRequestDTO) {
        return CrewResponseDTO.builder()
                .id(null)
                .name(null)
                .description(null)
                .imageUrl(null)
                .promotionUrl(null)
                .portfolioVideoUrl(null)
                .build();
    }

    @Override
    public CrewResponseDTO deleteCrew(Long id) {
        return CrewResponseDTO.builder()
                .id(null)
                .name(null)
                .description(null)
                .imageUrl(null)
                .promotionUrl(null)
                .portfolioVideoUrl(null)
                .build();
    }

    @Override
    public void followCrew(CrewFollowRequestDTO crewFollowRequestDTO) {

    }

    @Override
    public void unfollowCrew(Long crewId) {

    }

    @Override
    public List<CrewResponseDTO> getRecommendedCrew() {
        return List.of();
    }
}
