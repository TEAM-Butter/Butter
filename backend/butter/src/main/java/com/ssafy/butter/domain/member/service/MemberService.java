package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import org.apache.coyote.BadRequestException;

public interface MemberService {
    public MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException;
    public boolean checkIfEmailExists(EmailDTO emailDTO);
}
