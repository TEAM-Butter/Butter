package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.auth.dto.request.LoginRequestDTO;
import com.ssafy.butter.auth.dto.request.SocialLoginRequestDTO;
import com.ssafy.butter.auth.dto.response.AuthenticatedMemberInfoDTO;
import com.ssafy.butter.auth.dto.response.LoginResponseDTO;
import com.ssafy.butter.auth.dto.response.ReissueResponseDTO;
import com.ssafy.butter.auth.enums.MemberTypes;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.crew.service.CrewMemberService;
import com.ssafy.butter.domain.member.dto.response.RegisterExtraInfoResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.service.member.MemberService;
import com.ssafy.butter.global.token.JwtManager;
import com.ssafy.butter.global.util.encrypt.EncryptUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final MemberService memberService;
    private final List<OAuth2LoginService> oAuth2LoginServices;
    private final JwtManager jwtManager;
    private final RefreshTokenService refreshTokenService;
    private final EncryptUtils encryptUtils;
    private final CrewMemberService crewMemberService;

    //TODO : 예외 처리
    @Override
    @Transactional
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO){
        Member member = memberService.findByLoginId(loginRequestDTO.loginId())
                .orElseThrow(NoClassDefFoundError::new);

        boolean isMatch = member.getPassword().match(encryptUtils, loginRequestDTO.password());
        if(!isMatch)throw new IllegalStateException("ERR : 패스워드 틀림");

        String memberType = getMemberTypeInLogic(member);
        List<String> genres = member.getMemberGenres().stream()
                .map(memberGenre -> memberGenre.getGenre().getName())
                .toList();
        AuthenticatedMemberInfoDTO authenticatedMemberInfo = new AuthenticatedMemberInfoDTO(
                member.getNickname().getValue(),
                member.getProfileImage(),
                member.getAvatarType().getName(),
                memberType,
                genres,
                false
        );

        AuthInfoDTO authInfo = new AuthInfoDTO(member.getId(),member.getEmail().getValue(), member.getGender().name(), member.getBirthDate().getDate());
        String accessToken = jwtManager.createAccessToken(authInfo);
        String refreshToken = jwtManager.createRefreshToken();

        refreshTokenService.saveToken(refreshToken, authInfo.id());

        return new LoginResponseDTO(accessToken, refreshToken, authenticatedMemberInfo);
    }

    private String getMemberTypeInLogic(Member member){
        CrewMember findCrewMember =  crewMemberService.findByMember(member);
        if(findCrewMember==null)return MemberTypes.MEMBER.name().toLowerCase();

        boolean isCrewAdmin = findCrewMember.getIsCrewAdmin();

        return isCrewAdmin?MemberTypes.CREW.name().toLowerCase():MemberTypes.MEMBER.name().toLowerCase();
    }

    @Override
    @Transactional
    public LoginResponseDTO loginByOAuth(SocialLoginRequestDTO socialLoginRequestDTO){
        Member loginMember = oAuth2LoginServices.stream()
                .filter(service -> Objects.equals(service.supports(), socialLoginRequestDTO.platform()))
                .findFirst()
                .map(service -> service.convertUserDetailsToMemberEntity(socialLoginRequestDTO.code()))
                .orElseThrow(() -> new IllegalArgumentException("ERR : 사용할 수 없는 OAuth 플랫폼입니다"));

        Member member = memberService.findByEmail(loginMember.getEmail())
                .orElse(memberService.save(loginMember));

        String memberType = getMemberTypeInLogic(member);
        List<String> genres = member.getMemberGenres().stream()
                .map(memberGenre -> memberGenre.getGenre().getName())
                .toList();
        AuthenticatedMemberInfoDTO authenticatedMemberInfo = new AuthenticatedMemberInfoDTO(
                member.getNickname().getValue(),
                member.getProfileImage(),
                member.getAvatarType().getName(),
                memberType,
                genres,
                false
        );

        AuthInfoDTO authInfo = new AuthInfoDTO(member.getId(),member.getEmail().getValue(), member.getGender().name(), member.getBirthDate().getDate());
        String accessToken = jwtManager.createAccessToken(authInfo);
        String refreshToken = jwtManager.createRefreshToken();

        refreshTokenService.saveToken(refreshToken, authInfo.id());

        return new LoginResponseDTO(accessToken, refreshToken, authenticatedMemberInfo);
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
