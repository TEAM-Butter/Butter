package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.enums.Platform;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final MemberRepository memberRepository;
    private final List<OAuth2LoginService> oAuth2LoginServices;

    public AuthInfoDTO login(LoginRequestDTO loginRequestDTO){
        Member member = memberRepository.findByEmail(loginRequestDTO.email())
                .orElseThrow(NoClassDefFoundError::new);

        return new AuthInfoDTO(member.getId(),member.getEmail().getValue(), member.getGender().name(), member.getBirthDate().getDate());
    }

    public AuthInfoDTO loginByOAuth(String code, Platform platform){
        Member loginMember = oAuth2LoginServices.stream()
                .filter(service -> service.supports().equals(platform))
                .findFirst()
                .map(service -> service.convertUserDetailsToMemberEntity(code))
                .orElse(null);

        Member findMember = memberRepository.findByEmail(loginMember.getEmail().getValue())
                .orElse(memberRepository.save(loginMember));

        return new AuthInfoDTO(findMember.getId(),findMember.getEmail().getValue(), findMember.getGender().name(), findMember.getBirthDate().getDate());
    }
}
