package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.CrewNoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.CrewNoticeResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CrewNoticeServiceImpl implements CrewNoticeService {

    @Override
    public CrewNoticeResponseDTO createCrewNotice(CrewNoticeSaveRequestDTO crewNoticeSaveRequestDTO) {
        return CrewNoticeResponseDTO.builder()
                .id(null)
                .title(null)
                .content(null)
                .imageUrl(null)
                .createDate(null)
                .updateDate(null)
                .build();
    }
}
