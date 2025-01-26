package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
