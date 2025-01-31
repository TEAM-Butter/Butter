package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    public Member signUp(SignUpDTO signUpDTO, MultipartFile profileImage);
    public MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException;
    public boolean checkIfEmailExists(EmailDTO emailDTO);
}
