package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;

public interface LiveService {

    LiveResponseDTO createLive(LiveSaveRequestDTO liveSaveRequestDTO);

    LiveResponseDTO getLiveDetail(Long id);
}
