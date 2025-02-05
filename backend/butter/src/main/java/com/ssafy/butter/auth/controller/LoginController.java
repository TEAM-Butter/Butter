package com.ssafy.butter.auth.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.dto.request.SocialLoginRequestDTO;
import com.ssafy.butter.auth.dto.response.LoginResponseDTO;
import com.ssafy.butter.auth.dto.response.ReissueResponseDTO;
import com.ssafy.butter.auth.service.LoginService;
import com.ssafy.butter.global.token.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "로그인 및 인증 관련 API")
public class LoginController {

    private final LoginService loginService;

    @Operation(
            summary = "로그인",
            description = "사용자가 아이디와 비밀번호를 입력하여 로그인을 수행합니다."
    )
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){
        LoginResponseDTO response = loginService.login(loginRequestDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
                .header("refresh-token", "Bearer "+response.refreshToken())
                .body(response);
    }

    @Operation(
            summary = "소셜 로그인",
            description = "OAuth 소셜 로그인 (Google, Kakao, Naver 등)을 수행합니다."
    )
    @PostMapping("/login/social")
    public ResponseEntity<LoginResponseDTO> socialLogin(@RequestBody SocialLoginRequestDTO socialLoginRequestDTO){
        LoginResponseDTO response = loginService.loginByOAuth(socialLoginRequestDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
                .header("refresh-token", "Bearer "+response.refreshToken())
                .body(response);
    }

    @Operation(
            summary = "토큰 재발급",
            description = "만료된 액세스 토큰을 새롭게 발급합니다.",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @GetMapping("/reissue")
    public ResponseEntity<ReissueResponseDTO> reissueAccessToken(
            HttpServletRequest request,
            @CurrentUser AuthInfoDTO authInfoDTO) {

        ReissueResponseDTO response = loginService.reissueAccessToken(request, authInfoDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
                .body(response);
    }
}
