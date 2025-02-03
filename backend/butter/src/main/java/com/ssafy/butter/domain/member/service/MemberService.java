package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.infrastructure.emailAuth.dto.request.EmailDTO;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member findById(Long id);
    Member signUp(SignUpDTO signUpDTO, MultipartFile profileImage);
    MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException;
    boolean checkIfEmailExists(EmailDTO emailDTO);
}
