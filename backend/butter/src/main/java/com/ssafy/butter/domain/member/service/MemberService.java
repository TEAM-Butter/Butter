package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.member.dto.request.ProfileUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.dto.response.ProfileUpdateResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import java.util.Optional;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member findById(Long id);
    Optional<Member> findByEmail(String email);
    Member signUp(SignUpDTO signUpDTO, MultipartFile profileImage);
    MyPageResponseDTO getMyPageInfo(final Long memberId) throws BadRequestException;
    ProfileUpdateResponseDTO updateProfile(ProfileUpdateRequestDTO profileUpdateRequestDTO, Long memberId);
    boolean checkIfEmailExists(SendEmailDTO emailDTO);
    boolean checkIfNickNameExists(String nickname);
}
