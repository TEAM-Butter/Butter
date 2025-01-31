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

        return new AuthInfoDTO(member.getId(), member.getEmail().getValue(), member.getNickname().getValue());
    }

    public String loginByOAuth(String code, Platform platform){
        Member member = null;

        for(OAuth2LoginService oAuth2LoginService : oAuth2LoginServices){
            if(oAuth2LoginService.supports().equals(platform)){
                member = oAuth2LoginService.toMemberEntity(code);
                break;
            }
        }

        if(member == null){
            throw new IllegalArgumentException("존재하지 않는 사용자 로그인입니다.");
        }


    }
}
