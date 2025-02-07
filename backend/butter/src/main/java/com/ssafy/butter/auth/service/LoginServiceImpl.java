package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.dto.request.SocialLoginRequestDTO;
import com.ssafy.butter.auth.dto.response.LoginResponseDTO;
import com.ssafy.butter.auth.dto.response.ReissueResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.global.token.CurrentUser;
import com.ssafy.butter.global.token.JwtExtractor;
import com.ssafy.butter.global.token.JwtManager;
import com.ssafy.butter.global.util.encrypt.EncryptUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.Enumeration;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final MemberService memberService;
    private final List<OAuth2LoginService> oAuth2LoginServices;
    private final JwtManager jwtManager;
    private final JwtExtractor jwtExtractor;
    private final RefreshTokenService refreshTokenService;
    private final EncryptUtils encryptUtils;

    //TODO : 예외 처리
    @Override
    @Transactional
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO){
        Member member = memberService.findByLoginId(loginRequestDTO.loginId())
                .orElseThrow(NoClassDefFoundError::new);

        boolean isMatch = member.getPassword().match(encryptUtils, loginRequestDTO.password());
        if(!isMatch)throw new IllegalStateException("ERR : 패스워드 틀림");

        AuthInfoDTO authInfo = new AuthInfoDTO(member.getId(),member.getEmail().getValue(), member.getGender().name(), member.getBirthDate().getDate());
        String accessToken = jwtManager.createAccessToken(authInfo);
        String refreshToken = jwtManager.createRefreshToken();

        refreshTokenService.saveToken(refreshToken, authInfo.id());

        return new LoginResponseDTO(accessToken, refreshToken, authInfo);
    }

    @Override
    @Transactional
    public LoginResponseDTO loginByOAuth(SocialLoginRequestDTO socialLoginRequestDTO){
        Member loginMember = oAuth2LoginServices.stream()
                .filter(service -> Objects.equals(service.supports(), socialLoginRequestDTO.platform()))
                .findFirst()
                .map(service -> service.convertUserDetailsToMemberEntity(socialLoginRequestDTO.code()))
                .orElseThrow(() -> new IllegalArgumentException("ERR : 사용할 수 없는 OAuth 플랫폼입니다"));

        Member findMember = memberService.findByEmail(loginMember.getEmail())
                .orElse(memberService.save(loginMember));

        AuthInfoDTO authInfo = new AuthInfoDTO(findMember.getId(),findMember.getEmail().getValue(), findMember.getGender().name(), findMember.getBirthDate().getDate());
        String accessToken = jwtManager.createAccessToken(authInfo);
        String refreshToken = jwtManager.createRefreshToken();

        refreshTokenService.saveToken(refreshToken, authInfo.id());

        return new LoginResponseDTO(accessToken, refreshToken, authInfo);
    }

    @Override
    public ReissueResponseDTO reissueAccessToken(HttpServletRequest request, AuthInfoDTO authInfoDTO, String refreshToken){
        validateHeaderExists(refreshToken);

        Long memberId = authInfoDTO.id();

        refreshTokenService.matches(refreshToken, memberId);

        String accessToken = jwtManager.createAccessToken(authInfoDTO);

        return new ReissueResponseDTO(accessToken, authInfoDTO);
    }

    private void validateHeaderExists(String refreshToken){
        if (Objects.isNull(refreshToken)) {
            throw new NoSuchElementException();
        }
    }
}
