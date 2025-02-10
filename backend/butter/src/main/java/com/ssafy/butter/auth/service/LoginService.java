package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.dto.request.SocialLoginRequestDTO;
import com.ssafy.butter.auth.dto.response.LoginResponseDTO;
import com.ssafy.butter.auth.dto.response.ReissueResponseDTO;
import com.ssafy.butter.global.token.CurrentUser;
import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {
    LoginResponseDTO login(LoginRequestDTO loginRequestDTO);
    LoginResponseDTO loginByOAuth(SocialLoginRequestDTO socialLoginRequestDTO);
    public ReissueResponseDTO reissueAccessToken(HttpServletRequest request, AuthInfoDTO authInfoDTO, String refreshToken);
}
