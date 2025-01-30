package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.NoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.NoticeResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NoticeServiceImpl implements NoticeService {

    @Override
    public NoticeResponseDTO createCrewNotice(NoticeSaveRequestDTO noticeSaveRequestDTO) {
        return new NoticeResponseDTO(null, null, null, null, null, null);
    }

    @Override
    public List<NoticeResponseDTO> getCrewNoticeList(NoticeListRequestDTO noticeListRequestDTO) {
        return List.of();
    }

    @Override
    public NoticeResponseDTO getCrewNotice(Long id) {
        return new NoticeResponseDTO(null, null, null, null, null, null);
    }

    @Override
    public NoticeResponseDTO updateCrewNotice(Long id, NoticeSaveRequestDTO noticeSaveRequestDTO) {
        return new NoticeResponseDTO(null, null, null, null, null, null);
    }

    @Override
    public NoticeResponseDTO deleteCrewNotice(Long id) {
        return new NoticeResponseDTO(null, null, null, null, null, null);
    }
}
