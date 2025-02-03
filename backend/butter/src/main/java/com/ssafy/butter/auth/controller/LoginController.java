package com.ssafy.butter.auth.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.dto.request.SocialLoginRequestDTO;
import com.ssafy.butter.auth.dto.response.LoginResponseDTO;
import com.ssafy.butter.auth.dto.response.ReissueResponseDTO;
import com.ssafy.butter.auth.service.LoginService;
import com.ssafy.butter.global.token.CurrentUser;
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
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){
        LoginResponseDTO response = loginService.login(loginRequestDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
                .header("refresh-token", "Bearer "+response.refreshToken())
                .body(response);
    }

    @PostMapping("/login/social")
    public ResponseEntity<LoginResponseDTO> socialLogin(@RequestBody SocialLoginRequestDTO socialLoginRequestDTO){
        LoginResponseDTO response = loginService.loginByOAuth(socialLoginRequestDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
                .header("refresh-token", "Bearer "+response.refreshToken())
                .body(response);
    }

    @GetMapping("/reissue")
    public ResponseEntity<ReissueResponseDTO> reissueAccessToken(HttpServletRequest request, @CurrentUser AuthInfoDTO authInfoDTO){
        ReissueResponseDTO response = loginService.reissueAccessToken(request, authInfoDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+response.accessToken())
                .body(response);
    }
}
