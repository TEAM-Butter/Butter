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
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.live.service.LiveService;
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
    private final LiveService liveService;
    private final CrewMemberService crewMemberService;

    private final ClipRepository clipRepository;
    private final LikedClipRepository likedClipRepository;

    @Override
    public ClipResponseDTO createClip(AuthInfoDTO currentUser, ClipSaveRequestDTO clipSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Live live = liveService.findById(clipSaveRequestDTO.liveId());
        Crew crew = live.getCrew();
        if (!crewMemberService.findByCrewAndMember(crew, member).getIsCrewAdmin()) {
            throw new IllegalArgumentException("Current user is not crew admin");
        }

        Clip clip = Clip.builder()
                .live(live)
                .title(clipSaveRequestDTO.title())
                .videoUrl("")
                .hitCount(0L)
                .build();
        Clip savedClip = clipRepository.save(clip);

        String filenamePrefix = savedClip.getId() + "_" + System.currentTimeMillis() + "_";
        String videoUrl = filenamePrefix + clipSaveRequestDTO.video().getOriginalFilename();
        savedClip.updateVideoUrl(videoUrl);
        return ClipResponseDTO.fromEntity(clipRepository.save(savedClip));
    }

    @Override
    public ClipResponseDTO getClipDetail(Long id) {
        return ClipResponseDTO.fromEntity(clipRepository.findById(id).orElseThrow());
    }

    @Override
    public List<ClipResponseDTO> getClipList(ClipListRequestDTO clipListRequestDTO) {
        Pageable pageable = PageRequest.of(0, clipListRequestDTO.pageSize());
        if (clipListRequestDTO.clipId() == null) {
            return clipRepository.findAllByOrderByIdDesc(pageable).stream().map(ClipResponseDTO::fromEntity).toList();
        } else {
            return clipRepository.findAllByIdLessThanOrderByIdDesc(clipListRequestDTO.clipId(), pageable).stream().map(ClipResponseDTO::fromEntity).toList();
        }
    }

    @Override
    public ClipResponseDTO deleteClip(AuthInfoDTO currentUser, Long id) {
        Member member = memberService.findById(currentUser.id());
        Clip clip = clipRepository.findById(id).orElseThrow();
        Crew crew = clip.getLive().getCrew();
        if (!crewMemberService.findByCrewAndMember(crew, member).getIsCrewAdmin()) {
            throw new IllegalArgumentException("Current user is not crew admin");
        }

        clipRepository.delete(clip);
        return ClipResponseDTO.fromEntity(clip);
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
}
