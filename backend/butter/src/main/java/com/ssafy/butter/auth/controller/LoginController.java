package com.ssafy.butter.auth.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.service.LoginService;
import com.ssafy.butter.auth.service.RefreshTokenService;
import com.ssafy.butter.global.token.JwtExtractor;
import com.ssafy.butter.global.token.JwtManager;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {
    private final LoginService loginService;
    private final RefreshTokenService refreshTokenService;
    private final JwtManager jwtManager;
    private final JwtExtractor jwtExtractor;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO){
        AuthInfoDTO authInfoDTO = loginService.login(loginRequestDTO);
        String accessToken = jwtManager.createAccessToken(authInfoDTO);
        String refreshToken = jwtManager.createRefreshToken();
        refreshTokenService.saveToken(refreshToken, authInfoDTO.id());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                .header("refresh-token", "Bearer "+refreshToken)
                .build();
    }
}
