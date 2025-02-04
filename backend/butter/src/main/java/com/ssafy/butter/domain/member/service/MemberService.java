package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.member.dto.request.ExtraInfoDTO;
import com.ssafy.butter.domain.member.dto.request.PasswordUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.response.PasswordUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.ProfileUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.request.ProfileUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.response.RegisterExtraInfoResponseDTO;
import com.ssafy.butter.domain.member.dto.response.UserProfileResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import java.util.Optional;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    void save(Member member);
    Member findById(Long id);
    Optional<Member> findByEmail(String email);
    Member signUp(SignUpDTO signUpDTO, MultipartFile profileImage);
    UserProfileResponseDTO getMyProfile(final Long memberId) throws BadRequestException;
    ProfileUpdateResponseDTO updateProfile(ProfileUpdateRequestDTO profileUpdateRequestDTO, Long memberId);
    PasswordUpdateResponseDTO updatePassword(PasswordUpdateRequestDTO passwordUpdateRequestDTO, AuthInfoDTO authInfoDTO);
    RegisterExtraInfoResponseDTO saveExtraUserInfo(ExtraInfoDTO extraInfoDTO, Long memberId);
    boolean checkIfEmailExists(SendEmailDTO emailDTO);
}
