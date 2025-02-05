package com.ssafy.butter.domain.member.service.member;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.member.dto.request.CheckLoginIdDTO;
import com.ssafy.butter.domain.member.dto.request.ExtraInfoDTO;
import com.ssafy.butter.domain.member.dto.request.PasswordUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.response.CheckLoginIdResponseDTO;
import com.ssafy.butter.domain.member.dto.response.PasswordUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.response.ProfileUpdateResponseDTO;
import com.ssafy.butter.domain.member.dto.request.ExtraInfoUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.response.RegisterExtraInfoResponseDTO;
import com.ssafy.butter.domain.member.dto.response.SignUpResponseDTO;
import com.ssafy.butter.domain.member.dto.response.MyPageResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.dto.request.SignUpDTO;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.infrastructure.email.dto.request.SendEmailDTO;
import java.util.Optional;

public interface MemberService {

    Member save(Member member);
    Member findById(Long id);
    Optional<Member> findByEmail(Email email);
    Optional<Member> findByNickname(Nickname nickname);
    Optional<Member> findByLoginId(String loginId);
    SignUpResponseDTO signUp(SignUpDTO signUpDTO);
    MyPageResponseDTO getMyProfile(final Long memberId);
    ProfileUpdateResponseDTO updateProfile(ExtraInfoUpdateRequestDTO extraInfoUpdateRequestDTO, Long memberId);
    PasswordUpdateResponseDTO updatePassword(PasswordUpdateRequestDTO passwordUpdateRequestDTO, AuthInfoDTO authInfoDTO);
    RegisterExtraInfoResponseDTO saveExtraUserInfo(ExtraInfoDTO extraInfoDTO, Long memberId);
    boolean checkIfEmailExists(SendEmailDTO emailDTO);
    CheckLoginIdResponseDTO checkIfLoginIdExists(CheckLoginIdDTO loginIdDTO);
}
