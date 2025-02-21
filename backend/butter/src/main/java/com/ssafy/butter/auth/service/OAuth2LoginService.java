package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.enums.Platform;
import com.ssafy.butter.domain.member.entity.Member;

public interface OAuth2LoginService {
    Platform supports();

    Member convertUserDetailsToMemberEntity(String code);
}
