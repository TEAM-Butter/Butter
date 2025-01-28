package com.ssafy.butter.auth.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.service.LoginService;
import com.ssafy.butter.auth.service.RefreshTokenService;
import com.ssafy.butter.global.token.CurrentUser;
import com.ssafy.butter.global.token.JwtExtractor;
import com.ssafy.butter.global.token.JwtManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Enumeration;
import java.util.NoSuchElementException;
import java.util.Objects;

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

    @GetMapping("/reissue")
    public ResponseEntity<Void> reissueAccessToken(HttpServletRequest request, @CurrentUser AuthInfoDTO authInfoDTO){
        validateHeaderExists(request);

        Long memberId = authInfoDTO.id();
        Enumeration<String> headers = request.getHeaders("refresh-token");
        String refreshToken = jwtExtractor.extract(headers);

        refreshTokenService.matches(refreshToken, memberId);

        String accessToken = jwtManager.createAccessToken(authInfoDTO);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+accessToken)
                .build();
    }

    private void validateHeaderExists(HttpServletRequest request){
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String refreshTokenHeader = request.getHeader("Refresh-Token");
        if (Objects.isNull(authorizationHeader) || Objects.isNull(refreshTokenHeader)) {
            throw new NoSuchElementException();
        }
    }
}
