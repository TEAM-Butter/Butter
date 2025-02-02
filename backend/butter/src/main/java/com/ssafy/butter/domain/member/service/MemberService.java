package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.Optional;
import org.apache.coyote.BadRequestException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member findById(Long id);
    Optional<Member> findByEmail(String email);
    Member signUp(SignUpDTO signUpDTO, MultipartFile profileImage);
    MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException;
    boolean checkIfEmailExists(SendEmailDTO emailDTO);
}
