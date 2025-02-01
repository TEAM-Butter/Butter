package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;

import java.util.List;

public interface LiveService {

    LiveResponseDTO createLive(LiveSaveRequestDTO liveSaveRequestDTO);

    LiveResponseDTO getLiveDetail(Long id);

    List<LiveResponseDTO> getLiveList(LiveListRequestDTO liveListRequestDTO);
}
