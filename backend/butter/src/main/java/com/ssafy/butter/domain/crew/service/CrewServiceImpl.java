package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.crew.repository.CrewMemberRepository;
import com.ssafy.butter.domain.crew.repository.CrewRepository;
import com.ssafy.butter.domain.crew.repository.FollowRepository;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.repository.MemberRepository;
import com.ssafy.butter.domain.member.service.MemberService;
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

    private final MemberService memberService;

    private final CrewRepository crewRepository;
    private final CrewMemberRepository crewMemberRepository;
    private final FollowRepository followRepository;

    @Override
    public CrewResponseDTO createCrew(CrewSaveRequestDTO crewSaveRequestDTO) {
        if (crewSaveRequestDTO.portfolioVideo() == null) {
            throw new IllegalArgumentException("Portfolio video required");
        }

        Crew crew = Crew.builder()
                .name(crewSaveRequestDTO.name())
                .description(crewSaveRequestDTO.description())
                .promotionUrl(crewSaveRequestDTO.promotionUrl())
                .portfolioVideoUrl("")
                .build();
        Crew savedCrew = crewRepository.save(crew);

        String filenamePrefix = crew.getId() + "_" + System.currentTimeMillis() + "_";
        String imageUrl = null;
        if (crewSaveRequestDTO.image() != null) {
            imageUrl = filenamePrefix + crewSaveRequestDTO.image().getOriginalFilename();
        }
        String portfolioVideoUrl = filenamePrefix + crewSaveRequestDTO.portfolioVideo().getOriginalFilename();

        savedCrew.setImageUrl(imageUrl);
        savedCrew.setPortfolioVideoUrl(portfolioVideoUrl);
        return CrewResponseDTO.fromEntity(crewRepository.save(savedCrew));
    }

    @Override
    public void createCrewMember(CrewMemberRequestDTO crewMemberRequestDTO) {
        Crew crew = crewRepository.findById(crewMemberRequestDTO.crewId()).orElseThrow();
        Member member = memberService.findById(crewMemberRequestDTO.memberId());
        crewMemberRepository.findByCrewAndMember(crew, member).ifPresent(crewMember -> {
            throw new IllegalArgumentException("Crew member already exists");
        });
        CrewMember crewMember = CrewMember.builder()
                .crew(crew)
                .member(member)
                .build();
        crewMemberRepository.save(crewMember);
    }

    @Override
    public void deleteCrewMember(Long crewId, Long memberId) {
        Crew crew = crewRepository.findById(crewId).orElseThrow();
        Member member = memberService.findById(memberId);
        CrewMember crewMember = crewMemberRepository.findByCrewAndMember(crew, member).orElseThrow();
        crewMemberRepository.delete(crewMember);
    }

    @Override
    public List<CrewResponseDTO> getCrewList(CrewListRequestDTO crewListRequestDTO) {
        Pageable pageable = PageRequest.of(0, crewListRequestDTO.pageSize());
        if (crewListRequestDTO.keyword() == null) {
            if (crewListRequestDTO.crewId() == null) {
                return crewRepository.findAllOrderByIdDesc(pageable).stream().map(CrewResponseDTO::fromEntity).toList();
            } else {
                return crewRepository.findAllByIdLessThanOrderByIdDesc(crewListRequestDTO.crewId(), pageable).stream().map(CrewResponseDTO::fromEntity).toList();
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
    public CrewResponseDTO updateCrew(Long id, CrewSaveRequestDTO crewSaveRequestDTO) {
        Crew crew = crewRepository.findById(id).orElseThrow();
        String filenamePrefix = crew.getId() + "_" + System.currentTimeMillis() + "_";
        String imageUrl = null;
        if (crewSaveRequestDTO.image() != null) {
            imageUrl = filenamePrefix + crewSaveRequestDTO.image().getOriginalFilename();
        }
        String portfolioVideoUrl = filenamePrefix + crewSaveRequestDTO.portfolioVideo().getOriginalFilename();

        crew.setName(crewSaveRequestDTO.name());
        crew.setDescription(crewSaveRequestDTO.description());
        crew.setPromotionUrl(crewSaveRequestDTO.promotionUrl());
        crew.setImageUrl(imageUrl);
        crew.setPortfolioVideoUrl(portfolioVideoUrl);
        return CrewResponseDTO.fromEntity(crewRepository.save(crew));
    }

    @Override
    public CrewResponseDTO deleteCrew(Long id) {
        Crew crew = crewRepository.findById(id).orElseThrow();
        crewRepository.delete(crew);
        return CrewResponseDTO.fromEntity(crew);
    }

    @Override
    public void followCrew(Long memberId, CrewFollowRequestDTO crewFollowRequestDTO) {
        Crew crew = crewRepository.findById(crewFollowRequestDTO.crewId()).orElseThrow();
        Member member = memberService.findById(memberId);
        followRepository.findByCrewAndMember(crew, member).ifPresent(follow -> {
            throw new IllegalArgumentException("Crew follower already exists");
        });
        Follow follow = Follow.builder()
                .crew(crew)
                .member(member)
                .build();
        followRepository.save(follow);
    }

    @Override
    public void unfollowCrew(Long memberId, Long crewId) {
        Crew crew = crewRepository.findById(crewId).orElseThrow();
        Member member = memberService.findById(memberId);
        Follow follow = followRepository.findByCrewAndMember(crew, member).orElseThrow();
        followRepository.delete(follow);
    }

    @Override
    public List<CrewResponseDTO> getRecommendedCrewList() {
        return List.of();
    }
}
