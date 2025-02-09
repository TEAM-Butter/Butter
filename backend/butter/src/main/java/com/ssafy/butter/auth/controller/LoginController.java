package com.ssafy.butter.auth.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.dto.request.SocialLoginRequestDTO;
import com.ssafy.butter.auth.dto.response.LoginResponseDTO;
import com.ssafy.butter.auth.dto.response.ReissueResponseDTO;
import com.ssafy.butter.auth.service.LoginService;
import com.ssafy.butter.global.token.CurrentUser;
import com.ssafy.butter.global.util.encrypt.CookieUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "로그인 및 인증 관련 API")
public class LoginController {

    private final LoginService loginService;
    private final long refreshTokenValidityInMilliseconds;

    public LoginController(LoginService loginService, @Value("${custom.jwt.expire.refresh}") long refreshTokenValidityInMilliseconds) {
        this.loginService = loginService;
        this.refreshTokenValidityInMilliseconds = refreshTokenValidityInMilliseconds;
    }

    @Operation(
            summary = "로그인",
            description = "사용자가 아이디와 비밀번호를 입력하여 로그인을 수행합니다."
    )
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO, HttpServletResponse httpServletResponse){
        LoginResponseDTO response = loginService.login(loginRequestDTO);

        CookieUtil.addCookie(httpServletResponse, "refresh-token", response.refreshToken(), refreshTokenValidityInMilliseconds, true);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
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
            @CurrentUser AuthInfoDTO authInfoDTO,
            @CookieValue("refresh-token")String refreshToken) {

        log.info("쿠키에서 가져온 리프레지 토큰 : "+refreshToken);

        ReissueResponseDTO response = loginService.reissueAccessToken(request, authInfoDTO, refreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
                .body(response);
    }
}
