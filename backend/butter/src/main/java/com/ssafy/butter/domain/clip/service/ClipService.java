package com.ssafy.butter.domain.clip.service;

import com.ssafy.butter.domain.clip.dto.request.ClipListRequestDTO;
import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import com.ssafy.butter.domain.clip.dto.response.ClipResponseDTO;

import java.util.List;

public interface ClipService {

    ClipResponseDTO createClip(ClipSaveRequestDTO clipSaveRequestDTO);

    ClipResponseDTO getClipDetail(Long id);
}
