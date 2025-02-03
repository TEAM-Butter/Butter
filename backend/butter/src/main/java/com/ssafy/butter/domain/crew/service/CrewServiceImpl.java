package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
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
import com.ssafy.butter.domain.member.service.MemberService;
import com.ssafy.butter.infrastructure.awsS3.S3ImageUploader;
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
    private final S3ImageUploader s3ImageUploader;

    private final CrewRepository crewRepository;
    private final CrewMemberRepository crewMemberRepository;
    private final FollowRepository followRepository;

    /**
     * 크루 생성 요청 DTO를 받아 크루를 생성 및 DB에 저장 후 크루 응답 DTO를 반환한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewSaveRequestDTO 크루 생성 요청 정보를 담은 DTO
     * @return 크루 생성 응답 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO createCrew(AuthInfoDTO currentUser, CrewSaveRequestDTO crewSaveRequestDTO) {
        String imageUrl = null;
        if (crewSaveRequestDTO.image() != null) {
            imageUrl = s3ImageUploader.uploadImage(crewSaveRequestDTO.image());
        }
        String portfolioVideoUrl = s3ImageUploader.uploadImage(crewSaveRequestDTO.portfolioVideo());
        Crew crew = Crew.builder()
                .name(crewSaveRequestDTO.name())
                .description(crewSaveRequestDTO.description())
                .promotionUrl(crewSaveRequestDTO.promotionUrl())
                .imageUrl(imageUrl)
                .portfolioVideoUrl(portfolioVideoUrl)
                .build();
        Crew savedCrew = crewRepository.save(crew);

        crewMemberRepository.save(CrewMember.builder()
                .crew(savedCrew)
                .member(memberService.findById(currentUser.id()))
                .build());

        return CrewResponseDTO.fromEntity(savedCrew);
    }

    /**
     * 크루 ID와 멤버 ID가 담긴 DTO를 받아 크루 멤버를 DB에 저장한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewMemberRequestDTO 크루와 크루 멤버 정보를 담은 DTO
     */
    @Override
    public void createCrewMember(AuthInfoDTO currentUser, CrewMemberRequestDTO crewMemberRequestDTO) {
        Member currentMember = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(crewMemberRequestDTO.crewId()).orElseThrow();
        CrewMember currentCrewMember = crewMemberRepository.findByCrewAndMember(crew, currentMember).orElseThrow();
        if (!currentCrewMember.getIsCrewAdmin()) {
            throw new IllegalArgumentException("Current user is not crew admin");
        }

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

    /**
     * 크루 ID와 멤버 ID를 받아 크루 멤버를 DB에서 삭제한다.
     * @param crewId 크루를 가리키는 ID
     * @param memberId 멤버를 가리키는 ID
     */
    @Override
    public void deleteCrewMember(Long crewId, Long memberId) {
        Crew crew = crewRepository.findById(crewId).orElseThrow();
        Member member = memberService.findById(memberId);
        CrewMember crewMember = crewMemberRepository.findByCrewAndMember(crew, member).orElseThrow();
        crewMemberRepository.delete(crewMember);
    }

    /**
     * 크루 목록 조회 요청 정보를 담은 DTO를 받아 조건에 맞는 크루 목록을 조회하여 DTO 리스트로 반환한다.
     * @param crewListRequestDTO 크루 목록 조회 요청 정보를 담은 DTO
     * @return 크루 목록 조회 결과를 담은 DTO
     */
    @Override
    public List<CrewResponseDTO> getCrewList(CrewListRequestDTO crewListRequestDTO) {
        Pageable pageable = PageRequest.of(0, crewListRequestDTO.pageSize());
        if (crewListRequestDTO.keyword() == null) {
            if (crewListRequestDTO.crewId() == null) {
                return crewRepository.findAllByOrderByIdDesc(pageable).stream().map(CrewResponseDTO::fromEntity).toList();
            } else {
                return crewRepository.findAllByIdLessThanOrderByIdDesc(crewListRequestDTO.crewId(), pageable).stream().map(CrewResponseDTO::fromEntity).toList();
            }
        } else {
            return null;
        }
        // TODO 키워드가 주어진 경우 처리 로직 필요
    }

    /**
     * 크루 ID에 해당하는 크루 하나의 정보를 DB에서 조회 후 반환한다.
     * @param id 조회하려는 크루를 가리키는 ID
     * @return 크루 조회 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO getCrewDetail(Long id) {
        return CrewResponseDTO.fromEntity(crewRepository.findById(id).orElseThrow());
    }

    /**
     * 수정하려는 크루의 ID와 수정할 내용을 받아 DB에 반영하고 수정 결과를 반환한다.
     * @param id 수정하려는 크루의 ID
     * @param crewSaveRequestDTO 수정할 크루 내용을 담은 DTO
     * @return 수정된 크루 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO updateCrew(Long id, CrewSaveRequestDTO crewSaveRequestDTO) {
        Crew crew = crewRepository.findById(id).orElseThrow();
        String imageUrl = null;
        if (crewSaveRequestDTO.image() != null) {
            imageUrl = s3ImageUploader.uploadImage(crewSaveRequestDTO.image());
        }

        crew.update(crewSaveRequestDTO, imageUrl);
        return CrewResponseDTO.fromEntity(crewRepository.save(crew));
    }

    /**
     * 삭제하려는 크루 ID를 받아 해당 크루를 DB에서 삭제한다.
     * @param id 삭제하려는 크루 ID
     * @return 삭제된 크루 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO deleteCrew(Long id) {
        Crew crew = crewRepository.findById(id).orElseThrow();
        crewRepository.delete(crew);
        return CrewResponseDTO.fromEntity(crew);
    }

    /**
     * 팔로우하는 사용자의 ID와 팔로우 대상의 ID를 담은 DTO를 받아 팔로우 정보를 DB에 저장한다.
     * @param memberId 팔로우하는 사용자의 ID
     * @param crewFollowRequestDTO 팔로우 대상의 ID를 담은 DTO
     */
    @Override
    public void followCrew(Long memberId, CrewFollowRequestDTO crewFollowRequestDTO) {
        Crew crew = crewRepository.findById(crewFollowRequestDTO.crewId()).orElseThrow();
        Member member = memberService.findById(memberId);
        followRepository.findByCrewAndMember(crew, member).ifPresentOrElse(follow -> {
            if (follow.getIsFollowed()) {
                throw new IllegalArgumentException("Crew follower already exists");
            }
            follow.updateIsFollowed(true);
            followRepository.save(follow);
        }, () -> {
            Follow follow = Follow.builder()
                    .crew(crew)
                    .member(member)
                    .isFollowed(true)
                    .build();
            followRepository.save(follow);
        });
    }

    /**
     * 팔로우하는 사용자의 ID와 팔로우 대상의 ID를 받아 팔로우 정보를 DB에서 삭제한다.
     * @param memberId 팔로우하는 사용자의 ID
     * @param crewId 팔로우 대상의 ID
     */
    @Override
    public void unfollowCrew(Long memberId, Long crewId) {
        Crew crew = crewRepository.findById(crewId).orElseThrow();
        Member member = memberService.findById(memberId);
        Follow follow = followRepository.findByCrewAndMember(crew, member).orElseThrow();
        follow.updateIsFollowed(false);
        followRepository.save(follow);
    }

    /**
     * 사용자의 추천 크루 목록을 생성한다.
     * @return 추천된 크루 목록을 담은 DTO 리스트
     */
    @Override
    public List<CrewResponseDTO> getRecommendedCrewList() {
        return List.of();
    }

    /**
     * 크루의 ID를 받아 해당 크루 엔티티를 반환한다.
     * @param id 크루 ID
     * @return 해당 크루 엔티티
     */
    @Override
    public Crew findById(Long id) {
        return crewRepository.findById(id).orElseThrow();
    }
}
