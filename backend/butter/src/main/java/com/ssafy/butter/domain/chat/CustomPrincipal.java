package com.ssafy.butter.domain.chat;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import java.security.Principal;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CustomPrincipal implements Principal {

    private final AuthInfoDTO authInfo;

    @Override
    public String getName() {
        return authInfo.email();
    }
}
