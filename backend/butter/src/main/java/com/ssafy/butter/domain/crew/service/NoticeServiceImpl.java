package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeListRequestDTO;
import com.ssafy.butter.domain.crew.dto.request.NoticeSaveRequestDTO;
import com.ssafy.butter.domain.crew.dto.response.NoticeResponseDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Notice;
import com.ssafy.butter.domain.crew.repository.crewmember.CrewMemberRepository;
import com.ssafy.butter.domain.crew.repository.crew.CrewRepository;
import com.ssafy.butter.domain.crew.repository.notice.NoticeRepository;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.domain.notification.enums.NotificationType;
import com.ssafy.butter.domain.notification.service.NotificationService;
import com.ssafy.butter.infrastructure.awsS3.ImageUploader;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NoticeServiceImpl implements NoticeService {

    private final ImageUploader imageUploader;

    private final CrewService crewService;
    private final MemberService memberService;
    private final NotificationService notificationService;

    private final CrewRepository crewRepository;
    private final CrewMemberRepository crewMemberRepository;
    private final NoticeRepository noticeRepository;

    /**
     * 크루 공지사항 정보를 담은 DTO를 받아 DB에 저장하고 생성된 공지사항 정보를 담은 DTO를 반환한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param noticeSaveRequestDTO 생성할 공지사항 요청 정보를 담은 DTO
     * @return 생성된 공지사항 결과 정보를 담은 DTO
     */
    @Override
    public NoticeResponseDTO createCrewNotice(AuthInfoDTO currentUser, NoticeSaveRequestDTO noticeSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(noticeSaveRequestDTO.crewId()).orElseThrow();
        crewService.validateCrewAdmin(crew, member);

        String imageUrl = null;
        if (noticeSaveRequestDTO.image() != null) {
            imageUrl = imageUploader.uploadImage(noticeSaveRequestDTO.image());
        }
        Notice notice = Notice.builder()
                .crew(crew)
                .title(noticeSaveRequestDTO.title())
                .content(noticeSaveRequestDTO.content())
                .imageUrl(imageUrl)
                .build();

        String content = "크루 공지: " + notice.getTitle();
        String notificationType = NotificationType.NOTICE.getAlias();
        String url = NotificationType.NOTICE.getPath() + notice.getId();
        notificationService.sendNotificationToFollowers(notice.getCrew(), content, notificationType, url);

        return NoticeResponseDTO.fromEntity(noticeRepository.save(notice));
    }

    /**
     * 크루 공지사항 목록 조회 정보를 담은 DTO를 받아 DB에서 조회 후 결과를 반환한다.
     * @param noticeListRequestDTO 크루 공지사항 조회 요청 정보를 담은 DTO
     * @return 크루 공지사항 조회 결과를 담은 DTO 리스트
     */
    @Override
    public List<NoticeResponseDTO> getCrewNoticeList(NoticeListRequestDTO noticeListRequestDTO) {
        Pageable pageable = PageRequest.of(0, noticeListRequestDTO.pageSize());
        if (noticeListRequestDTO.crewId() == null) {
            return noticeRepository.findAllByOrderByIdDesc(pageable).stream().map(NoticeResponseDTO::fromEntity).toList();
        } else {
            return noticeRepository.findAllByIdLessThanOrderByIdDesc(noticeListRequestDTO.crewId(), pageable).stream().map(NoticeResponseDTO::fromEntity).toList();
        }
    }

    /**
     * 조회할 크루 공지사항 ID를 받아 DB에서 조회 후 결과를 반환한다.
     * @param id 조회할 크루 공지사항을 가리키는 ID
     * @return 조회된 크루 공지사항 결과 DTO
     */
    @Override
    public NoticeResponseDTO getCrewNotice(Long id) {
        return NoticeResponseDTO.fromEntity(noticeRepository.findById(id).orElseThrow());
    }

    /**
     * 수정할 크루 공지사항 ID와 수정 정보 DTO를 받아 DB에 수정 내용을 반영하고 수정 결과를 반환한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param id                   수정할 크루 공지사항을 나타내는 ID
     * @param noticeSaveRequestDTO 크루 공지사항 수정 요청 정보를 담은 DTO
     * @return 크루 공지사항 수정 결과를 담은 DTO
     */
    @Override
    public NoticeResponseDTO updateCrewNotice(AuthInfoDTO currentUser, Long id, NoticeSaveRequestDTO noticeSaveRequestDTO) {
        Member member = memberService.findById(currentUser.id());
        Crew crew = crewRepository.findById(noticeSaveRequestDTO.crewId()).orElseThrow();
        crewService.validateCrewAdmin(crew, member);
        Notice notice = noticeRepository.findById(id).orElseThrow();
        String imageUrl = null;
        if (noticeSaveRequestDTO.image() != null) {
            imageUrl = imageUploader.uploadImage(noticeSaveRequestDTO.image());
        }
        notice.update(noticeSaveRequestDTO, imageUrl);
        return NoticeResponseDTO.fromEntity(noticeRepository.save(notice));
    }

    /**
     * 삭제하려는 크루 공지사항 ID를 받아 DB에서 삭제하고 삭제된 크루 공지사항을 반환한다.
     * @param currentUser 현재 로그인한 유저 정보
     * @param id          삭제하려는 크루 공지사항을 가리키는 ID
     * @return 삭제된 크루 공지사항 정보를 담은 DTO
     */
    @Override
    public NoticeResponseDTO deleteCrewNotice(AuthInfoDTO currentUser, Long id) {
        Member member = memberService.findById(currentUser.id());
        Notice notice = noticeRepository.findById(id).orElseThrow();
        Crew crew = notice.getCrew();
        crewService.validateCrewAdmin(crew, member);
        noticeRepository.delete(notice);
        return NoticeResponseDTO.fromEntity(notice);
    }
}
