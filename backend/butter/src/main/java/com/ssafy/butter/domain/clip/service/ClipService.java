package com.ssafy.butter.domain.clip.service;

import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import com.ssafy.butter.domain.clip.dto.response.ClipResponseDTO;

public interface ClipService {

    ClipResponseDTO createClip(ClipSaveRequestDTO clipSaveRequestDTO);
}
