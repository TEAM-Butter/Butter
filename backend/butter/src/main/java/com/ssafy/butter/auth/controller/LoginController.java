package com.ssafy.butter.auth.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.dto.request.SocialLoginRequestDTO;
import com.ssafy.butter.auth.dto.response.AuthResponseDTO;
import com.ssafy.butter.auth.dto.response.ReissueResponseDTO;
import com.ssafy.butter.auth.enums.Platform;
import com.ssafy.butter.auth.service.LoginService;
import com.ssafy.butter.auth.service.RefreshTokenService;
import com.ssafy.butter.global.token.CurrentUser;
import com.ssafy.butter.global.token.JwtExtractor;
import com.ssafy.butter.global.token.JwtManager;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.NoSuchElementException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {
    private final LoginService loginService;
    private final RefreshTokenService refreshTokenService;
    private final JwtManager jwtManager;
    private final JwtExtractor jwtExtractor;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){
        AuthInfoDTO authInfo = loginService.login(loginRequestDTO);
        String accessToken = jwtManager.createAccessToken(authInfo);
        String refreshToken = jwtManager.createRefreshToken();
        refreshTokenService.saveToken(refreshToken, authInfo.id());

        AuthResponseDTO response = new AuthResponseDTO(accessToken, refreshToken, authInfo);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                .header("refresh-token", "Bearer "+refreshToken)
                .body(response);
    }

    @PostMapping("/login/social")
    public ResponseEntity<AuthResponseDTO> socialLogin(@RequestBody SocialLoginRequestDTO socialLoginRequestDTO){
        AuthInfoDTO authInfo = loginService.loginByOAuth(socialLoginRequestDTO.code(), Platform.valueOf(socialLoginRequestDTO.platform()));
        String accessToken = jwtManager.createAccessToken(authInfo);
        String refreshToken = jwtManager.createRefreshToken();
        refreshTokenService.saveToken(refreshToken, authInfo.id());

        AuthResponseDTO response = new AuthResponseDTO(accessToken, refreshToken, authInfo);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                .header("refresh-token", "Bearer "+refreshToken)
                .body(response);
    }

    @GetMapping("/reissue")
    public ResponseEntity<ReissueResponseDTO> reissueAccessToken(HttpServletRequest request, @CurrentUser AuthInfoDTO authInfoDTO){
        validateHeaderExists(request);

        Long memberId = authInfoDTO.id();
        Enumeration<String> headers = request.getHeaders("refresh-token");
        String refreshToken = jwtExtractor.extract(headers);

        refreshTokenService.matches(refreshToken, memberId);

        String accessToken = jwtManager.createAccessToken(authInfoDTO);

        ReissueResponseDTO response = new ReissueResponseDTO(accessToken, authInfoDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                .body(response);
    }

    private void validateHeaderExists(HttpServletRequest request){
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String refreshTokenHeader = request.getHeader("refresh-Token");
        if (Objects.isNull(authorizationHeader) || Objects.isNull(refreshTokenHeader)) {
            throw new NoSuchElementException();
        }
    }
}
