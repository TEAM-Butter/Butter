package com.ssafy.butter.domain.clip.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipLikeRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipListRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import com.ssafy.butter.domain.clip.dto.response.ClipResponseDTO;

import java.util.List;

public interface ClipService {

    ClipResponseDTO createClip(AuthInfoDTO currentUser, ClipSaveRequestDTO clipSaveRequestDTO);

    ClipResponseDTO getClipDetail(Long id);

    List<ClipResponseDTO> getClipList(ClipListRequestDTO clipListRequestDTO);

    ClipResponseDTO deleteClip(AuthInfoDTO currentUser, Long id);

    void likeClip(AuthInfoDTO currentUser, ClipLikeRequestDTO clipLikeRequestDTO);

    void unlikeClip(AuthInfoDTO currentUser, Long clipId);
}
