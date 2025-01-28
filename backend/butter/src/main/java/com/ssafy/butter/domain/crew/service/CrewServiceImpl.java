package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class CrewServiceImpl implements CrewService {

    private final CrewRepository crewRepository;

    @Override
    public CrewResponseDTO createCrew(CrewSaveRequestDTO crewSaveRequestDTO) {
        if (crewSaveRequestDTO.getPortfolioVideo() == null) {
            throw new IllegalArgumentException("Portfolio video required");
        }

        Crew crew = Crew.builder()
                .name(crewSaveRequestDTO.getName())
                .description(crewSaveRequestDTO.getDescription())
                .promotionUrl(crewSaveRequestDTO.getPromotionUrl())
                .portfolioVideoUrl("")
                .build();
        Crew savedCrew = crewRepository.save(crew);

        String filenamePrefix = crew.getId() + "_" + System.currentTimeMillis() + "_";
        String imageUrl = null;
        if (crewSaveRequestDTO.getImage() != null) {
            imageUrl = filenamePrefix + crewSaveRequestDTO.getImage().getOriginalFilename();
        }
        String portfolioVideoUrl = filenamePrefix + crewSaveRequestDTO.getPortfolioVideo().getOriginalFilename();

        savedCrew.setImageUrl(imageUrl);
        savedCrew.setPortfolioVideoUrl(portfolioVideoUrl);
        return CrewResponseDTO.fromEntity(crewRepository.save(savedCrew));
    }

    @Override
    public void createCrewMember(CrewMemberRequestDTO crewMemberRequestDTO) {

    }

    @Override
    public void deleteCrewMember(Long crewId, Long memberId) {

    }

    @Override
    public List<CrewResponseDTO> getCrewList(CrewListRequestDTO crewListRequestDTO) {
        Pageable pageable = PageRequest.of(0, crewListRequestDTO.getPageSize());
        if (crewListRequestDTO.getKeyword() == null) {
            if (crewListRequestDTO.getCrewId() == null) {
                return crewRepository.findAllOrderByIdDesc(pageable).stream().map(CrewResponseDTO::fromEntity).toList();
            } else {
                return crewRepository.findAllByIdLessThanOrderByIdDesc(crewListRequestDTO.getCrewId(), pageable).stream().map(CrewResponseDTO::fromEntity).toList();
            }
        } else {
            return null;
        }
    }

    @Override
    public CrewResponseDTO getCrewDetail(Long id) {
        return CrewResponseDTO.fromEntity(crewRepository.findById(id).orElseThrow());
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
    public List<CrewResponseDTO> getRecommendedCrewList() {
        return List.of();
    }
}
