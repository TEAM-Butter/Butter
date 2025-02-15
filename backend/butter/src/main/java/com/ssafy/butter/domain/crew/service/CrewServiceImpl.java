package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewFollowRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewGenreRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewMemberRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.CrewSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewMemberResponseDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewResponseDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewGenre;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.crew.repository.CrewGenreRepository;
import com.ssafy.butter.domain.crew.repository.crew.CrewRepository;
import com.ssafy.butter.domain.crew.repository.crewmember.CrewMemberRepository;
import com.ssafy.butter.domain.crew.repository.follow.FollowRepository;
import com.ssafy.butter.domain.crew.repository.genre.GenreRepository;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.infrastructure.awsS3.S3ImageUploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class  CrewServiceImpl implements CrewService {

    private final MemberService memberService;
    private final S3ImageUploader s3ImageUploader;

    private final CrewRepository crewRepository;
    private final CrewMemberRepository crewMemberRepository;
    private final FollowRepository followRepository;
    private final GenreRepository genreRepository;
    private final CrewGenreRepository crewGenreRepository;

    /**
     * 크루 생성 요청 DTO를 받아 크루를 생성 및 DB에 저장 후 크루 응답 DTO를 반환한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewSaveRequestDTO 크루 생성 요청 정보를 담은 DTO
     * @return 크루 생성 응답 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO createCrew(AuthInfoDTO currentUser, CrewSaveRequestDTO crewSaveRequestDTO) {
        if (crewSaveRequestDTO.portfolioVideo() == null || crewSaveRequestDTO.portfolioVideo().isEmpty()) {
            throw new IllegalArgumentException("Portfolio video required");
        }
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
                .isCrewAdmin(true)
                .build());

        return CrewResponseDTO.from(savedCrew, false);
    }

    /**
     * 크루 ID와 멤버 ID가 담긴 DTO를 받아 크루 멤버를 DB에 저장한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewMemberRequestDTO 크루와 크루 멤버 정보를 담은 DTO
     */
    @Override
    public CrewMemberResponseDTO createCrewMember(AuthInfoDTO currentUser, CrewMemberRequestDTO crewMemberRequestDTO) {
        Member currentMember = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(crewMemberRequestDTO.crewId()).orElseThrow();
        validateCrewAdmin(crew, currentMember);

        Member member = memberService.findById(crewMemberRequestDTO.memberId());
        crewMemberRepository.findByCrewAndMember(crew, member).ifPresent(crewMember -> {
            throw new IllegalArgumentException("Crew member already exists");
        });

        CrewMember crewMember = CrewMember.builder()
                .crew(crew)
                .member(member)
                .isCrewAdmin(false)
                .build();
        return CrewMemberResponseDTO.from(crewMemberRepository.save(crewMember).getMember());
    }

    /**
     * 크루 ID와 멤버 ID를 받아 크루 멤버를 DB에서 삭제한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewId      크루를 가리키는 ID
     * @param memberId    멤버를 가리키는 ID
     */
    @Override
    public void deleteCrewMember(AuthInfoDTO currentUser, Long crewId, Long memberId) {
        Member currentMember = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(crewId).orElseThrow();
        validateCrewAdmin(crew, currentMember);
        Member member = memberService.findById(memberId);
        CrewMember crewMember = crewMemberRepository.findByCrewAndMember(crew, member).orElseThrow();
        crewMemberRepository.delete(crewMember);
    }

    /**
     * 크루 목록 조회 요청 정보를 담은 DTO를 받아 조건에 맞는 크루 목록을 조회하여 DTO 리스트로 반환한다.
     *
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewListRequestDTO 크루 목록 조회 요청 정보를 담은 DTO
     * @return 크루 목록 조회 결과를 담은 DTO
     */
    @Override
    public List<CrewResponseDTO> getCrewList(AuthInfoDTO currentUser, CrewListRequestDTO crewListRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        return crewRepository.getCrewList(crewListRequestDTO).stream()
                .map(crew -> CrewResponseDTO.from(crew, isFollowing(member, crew))).toList();
    }

    /**
     * 크루 ID에 해당하는 크루 하나의 정보를 DB에서 조회 후 반환한다.
     *
     * @param currentUser 현재 로그인한 유저 정보
     * @param id          조회하려는 크루를 가리키는 ID
     * @return 크루 조회 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO getCrewDetail(AuthInfoDTO currentUser, Long id) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(id).orElseThrow();
        return CrewResponseDTO.from(crew, isFollowing(member, crew));
    }

    /**
     * 수정하려는 크루의 ID와 수정할 내용을 받아 DB에 반영하고 수정 결과를 반환한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param id                 수정하려는 크루의 ID
     * @param crewSaveRequestDTO 수정할 크루 내용을 담은 DTO
     * @return 수정된 크루 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO updateCrew(AuthInfoDTO currentUser, Long id, CrewSaveRequestDTO crewSaveRequestDTO) {
        Member currentMember = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(id).orElseThrow();
        validateCrewAdmin(crew, currentMember);
        String imageUrl = null;
        if (crewSaveRequestDTO.image() != null) {
            imageUrl = s3ImageUploader.uploadImage(crewSaveRequestDTO.image());
        }

        crew.update(crewSaveRequestDTO, imageUrl);
        return CrewResponseDTO.from(crewRepository.save(crew), isFollowing(currentMember, crew));
    }

    /**
     * 삭제하려는 크루 ID를 받아 해당 크루를 DB에서 삭제한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param id          삭제하려는 크루 ID
     * @return 삭제된 크루 정보를 담은 DTO
     */
    @Override
    public CrewResponseDTO deleteCrew(AuthInfoDTO currentUser, Long id) {
        Member currentMember = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(id).orElseThrow();
        validateCrewAdmin(crew, currentMember);
        crewRepository.delete(crew);
        return CrewResponseDTO.from(crew, false);
    }

    /**
     * 팔로우하는 사용자의 ID와 팔로우 대상의 ID를 담은 DTO를 받아 팔로우 정보를 DB에 저장한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewFollowRequestDTO 팔로우 대상의 ID를 담은 DTO
     */
    @Override
    public void followCrew(AuthInfoDTO currentUser, CrewFollowRequestDTO crewFollowRequestDTO) {
        Crew crew = crewRepository.findById(crewFollowRequestDTO.crewId()).orElseThrow();
        Member member = memberService.findById(currentUser.id());
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
     * @param currentUser 현재 로그인한 유저 정보
     * @param crewId      팔로우 대상의 ID
     */
    @Override
    public void unfollowCrew(AuthInfoDTO currentUser, Long crewId) {
        Crew crew = crewRepository.findById(crewId).orElseThrow();
        Member member = memberService.findById(currentUser.id());
        Follow follow = followRepository.findByCrewAndMember(crew, member).orElseThrow();
        if (!follow.getIsFollowed()) {
            throw new IllegalArgumentException("Crew follower does not exist");
        }
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

    @Override
    public void createCrewGenre(AuthInfoDTO currentUser, Long id, CrewGenreRequestDTO crewGenreRequestDTO) {
        Member currentMember = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(id).orElseThrow();
        CrewMember currentCrewMember = validateCrewAdmin(crew, currentMember);

        List<Genre> genres = crewGenreRequestDTO.genreNames().stream()
                .map(genreName -> genreRepository.findByName(genreName).orElseThrow()).toList();
        List<CrewGenre> crewGenres = genres.stream().map(genre -> CrewGenre.builder()
                .crew(crew)
                .genre(genre)
                .build()).toList();
        crewGenreRepository.deleteAllByCrew(crew);
        crewGenreRepository.saveAll(crewGenres);
    }

    @Override
    public List<CrewResponseDTO> getFollowedCrewList(AuthInfoDTO currentUser) {
        return crewRepository.getFollowedCrewList(currentUser.id()).stream()
                .map(crew -> CrewResponseDTO.from(crew, true)).toList();
    }

    @Override
    public CrewMember validateCrewAdmin(Crew crew, Member member) {
        CrewMember crewMember = crewMemberRepository.findByCrewAndMember(crew, member).orElseThrow();
        if (!crewMember.getIsCrewAdmin()) {
            throw new IllegalArgumentException("Current user is not crew admin");
        }
        return crewMember;
    }

    private boolean isFollowing(Member member, Crew crew) {
        return crew.getFollows().stream().anyMatch(follow -> follow.getMember().equals(member));
    }
}
