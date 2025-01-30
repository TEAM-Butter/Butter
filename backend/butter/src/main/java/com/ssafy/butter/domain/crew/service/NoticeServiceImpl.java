package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.dto.request.NoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.NoticeResponseDTO;
import com.ssafy.butter.domain.crew.entity.Notice;
import com.ssafy.butter.domain.crew.repository.CrewRepository;
import com.ssafy.butter.domain.crew.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        Pageable pageable = PageRequest.of(0, noticeListRequestDTO.pageSize());
        if (noticeListRequestDTO.crewId() == null) {
            return noticeRepository.findAllOrderByIdDesc(pageable).stream().map(NoticeResponseDTO::fromEntity).toList();
        } else {
            return noticeRepository.findAllByIdLessThanOrderByIdDesc(noticeListRequestDTO.crewId(), pageable).stream().map(NoticeResponseDTO::fromEntity).toList();
        }
    }

    @Override
    public NoticeResponseDTO getCrewNotice(Long id) {
        return NoticeResponseDTO.fromEntity(noticeRepository.findById(id).orElseThrow());
    }

    @Override
    public NoticeResponseDTO updateCrewNotice(Long id, NoticeSaveRequestDTO noticeSaveRequestDTO) {
        Notice notice = noticeRepository.findById(id).orElseThrow();
        notice.setTitle(noticeSaveRequestDTO.title());
        notice.setContent(noticeSaveRequestDTO.content());
        if (noticeSaveRequestDTO.image() != null) {
            String filenamePrefix = notice.getId() + "_" + System.currentTimeMillis() + "_";
            notice.setImageUrl(filenamePrefix + noticeSaveRequestDTO.image().getOriginalFilename());
        } else {
            notice.setImageUrl(null);
        }
        return NoticeResponseDTO.fromEntity(noticeRepository.save(notice));
    }

    @Override
    public NoticeResponseDTO deleteCrewNotice(Long id) {
        return new NoticeResponseDTO(null, null, null, null, null, null);
    }
}
