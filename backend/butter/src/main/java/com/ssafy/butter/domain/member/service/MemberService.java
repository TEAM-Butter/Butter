package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import org.apache.coyote.BadRequestException;

public interface MemberService {
    public MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException;
}
