package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.NoticeResponseDTO;

import java.util.List;

public interface NoticeService {

    NoticeResponseDTO createCrewNotice(AuthInfoDTO currentUser, NoticeSaveRequestDTO noticeSaveRequestDTO);

    List<NoticeResponseDTO> getCrewNoticeList(NoticeListRequestDTO noticeListRequestDTO);

    NoticeResponseDTO getCrewNotice(Long id);

    NoticeResponseDTO updateCrewNotice(Long id, NoticeSaveRequestDTO noticeSaveRequestDTO);

    NoticeResponseDTO deleteCrewNotice(Long id);
}
