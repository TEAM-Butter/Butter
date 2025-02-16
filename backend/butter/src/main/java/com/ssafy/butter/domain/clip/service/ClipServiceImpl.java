package com.ssafy.butter.domain.clip.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipLikeRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipListRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import com.ssafy.butter.domain.clip.dto.response.ClipResponseDTO;
import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.clip.entity.LikedClip;
import com.ssafy.butter.domain.clip.repository.ClipRepository;
import com.ssafy.butter.domain.clip.repository.LikedClipRepository;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.service.CrewMemberService;
import com.ssafy.butter.domain.crew.service.CrewService;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ClipServiceImpl implements ClipService {

    private final MemberService memberService;
    private final CrewService crewService;
    private final CrewMemberService crewMemberService;

    private final ClipRepository clipRepository;
    private final LikedClipRepository likedClipRepository;

    @Override
    public ClipResponseDTO createClip(AuthInfoDTO currentUser, ClipSaveRequestDTO clipSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewService.findById(clipSaveRequestDTO.crewId());
        crewService.validateCrewAdmin(crew, member);

        Clip clip = Clip.builder()
                .crew(crew)
                .title(clipSaveRequestDTO.title())
                .videoName(clipSaveRequestDTO.videoName())
                .hitCount(0L)
                .build();
        return ClipResponseDTO.from(clipRepository.save(clip), false);
    }

    @Override
    public ClipResponseDTO getClipDetail(AuthInfoDTO currentUser, Long id) {
        Member member = memberService.findById(currentUser.id());
        Clip clip = clipRepository.findById(id).orElseThrow();
        return ClipResponseDTO.from(clip, isLiking(member, clip));
    }

    @Override
    public List<ClipResponseDTO> getClipList(AuthInfoDTO currentUser, ClipListRequestDTO clipListRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Pageable pageable = PageRequest.of(0, clipListRequestDTO.pageSize());
        if (clipListRequestDTO.clipId() == null) {
            return clipRepository.findAllByOrderByIdDesc(pageable).stream()
                    .map(clip -> ClipResponseDTO.from(clip, isLiking(member, clip))).toList();
        } else {
            return clipRepository.findAllByIdLessThanOrderByIdDesc(clipListRequestDTO.clipId(), pageable).stream()
                    .map(clip -> ClipResponseDTO.from(clip, isLiking(member, clip))).toList();
        }
    }

    @Override
    public ClipResponseDTO deleteClip(AuthInfoDTO currentUser, Long id) {
        Member member = memberService.findById(currentUser.id());
        Clip clip = clipRepository.findById(id).orElseThrow();
        Crew crew = clip.getCrew();
        crewService.validateCrewAdmin(crew, member);

        clipRepository.delete(clip);
        return ClipResponseDTO.from(clip, false);
    }

    @Override
    public void likeClip(AuthInfoDTO currentUser, ClipLikeRequestDTO clipLikeRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Clip clip = clipRepository.findById(clipLikeRequestDTO.clipId()).orElseThrow();
        likedClipRepository.findByMemberAndClip(member, clip).ifPresentOrElse(likedClip -> {
            if (likedClip.getIsLiked()) {
                throw new IllegalArgumentException("Already liked clip");
            }
            likedClip.updateIsLiked(true);
            likedClipRepository.save(likedClip);
        }, () -> {
            likedClipRepository.save(LikedClip.builder()
                    .member(member)
                    .clip(clip)
                    .isLiked(true)
                    .build());
        });
    }

    @Override
    public void unlikeClip(AuthInfoDTO currentUser, Long clipId) {
        Member member = memberService.findById(currentUser.id());
        Clip clip = clipRepository.findById(clipId).orElseThrow();
        LikedClip likedClip = likedClipRepository.findByMemberAndClip(member, clip).orElseThrow();
        if (!likedClip.getIsLiked()) {
            throw new IllegalArgumentException("Already unliked clip");
        }
        likedClip.updateIsLiked(false);
        likedClipRepository.save(likedClip);
    }

    @Override
    public List<ClipResponseDTO> getLikedClipList(AuthInfoDTO currentUser) {
        return clipRepository.getLikedClipList(currentUser.id()).stream()
                .map(clip -> ClipResponseDTO.from(clip, true)).toList();
    }

    private boolean isLiking(Member member, Clip clip) {
        return clip.getLikedClips().stream()
                .anyMatch(likedClip -> likedClip.getMember().equals(member) && likedClip.getIsLiked());
    }
}
