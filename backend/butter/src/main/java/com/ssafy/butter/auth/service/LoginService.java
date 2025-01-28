package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final MemberRepository memberRepository;

    public AuthInfoDTO login(LoginRequestDTO loginRequestDTO){
        Member member = memberRepository.findByEmail(loginRequestDTO.email())
                .orElseThrow(NoClassDefFoundError::new);

        return new AuthInfoDTO(member.getId(), member.getEmail().getValue(), member.getNickname().getValue());
    }
}
