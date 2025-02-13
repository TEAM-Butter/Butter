package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.dto.request.LiveSaveRequestDTO;
import com.ssafy.butter.domain.live.dto.response.LiveResponseDTO;
import com.ssafy.butter.domain.live.entity.Live;

import java.util.List;

public interface LiveService {

    LiveResponseDTO createLive(AuthInfoDTO currentUser, LiveSaveRequestDTO liveSaveRequestDTO);

    LiveResponseDTO getLiveDetail(Long id);

    List<LiveResponseDTO> getLiveList(LiveListRequestDTO liveListRequestDTO);

    Live findById(Long id);

    void finishLive(AuthInfoDTO currentUser, Long id);
}
