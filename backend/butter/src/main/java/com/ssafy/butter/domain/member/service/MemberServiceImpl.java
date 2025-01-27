package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.repository.MemberRepository;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;

    /**
     * 멤버의 마이 페이지에 필요한 정보를 조회한다
     * @param memberId
     * @return
     * @throws BadRequestException
     */
    @Override
    @Transactional(readOnly = true)
    public MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException {
        final Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException("ERR : 멤버를 찾을 수 없습니다"));

        return MyPageResponseDTO.builder()
                .member(findMember)
                .build();
    }

    @Override
    public boolean checkIfEmailExists(EmailDTO emailDTO) {
        Optional<Member> findMember = memberRepository.findByEmail(emailDTO.email());
        return findMember.isPresent();
    }
}
