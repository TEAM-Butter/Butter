package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.NoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.NoticeResponseDTO;
import com.ssafy.butter.domain.crew.entity.Notice;
import com.ssafy.butter.domain.crew.repository.CrewRepository;
import com.ssafy.butter.domain.crew.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NoticeServiceImpl implements NoticeService {

    private final CrewRepository crewRepository;
    private final NoticeRepository noticeRepository;

    @Override
    public NoticeResponseDTO createCrewNotice(NoticeSaveRequestDTO noticeSaveRequestDTO) {
        Notice notice = Notice.builder()
                .crew(crewRepository.findById(noticeSaveRequestDTO.crewId()).orElseThrow())
                .title(noticeSaveRequestDTO.title())
                .content(noticeSaveRequestDTO.content())
                .imageUrl(null)
                .build();
        Notice savedNotice = noticeRepository.save(notice);

        String filenamePrefix = savedNotice.getId() + "_" + System.currentTimeMillis() + "_";
        if (noticeSaveRequestDTO.image() != null) {
            savedNotice.setImageUrl(filenamePrefix + noticeSaveRequestDTO.image().getOriginalFilename());
        }
        return NoticeResponseDTO.fromEntity(noticeRepository.save(savedNotice));
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
