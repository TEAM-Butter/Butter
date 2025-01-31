package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.dto.response.NaverAccessTokenResponseDTO;
import com.ssafy.butter.auth.dto.response.NaverUserDetailsResponseDTO;
import com.ssafy.butter.auth.enums.Platform;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.domain.member.vo.Nickname;
import com.ssafy.butter.global.config.NaverOAuthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class NaverOAuthLoginService implements OAuth2LoginService{
    private final NaverOAuthProperties naverOAuthProperties;
    private final RestTemplate restTemplate;

    @Override
    public Platform supports() {
        return Platform.NAVER;
    }

    @Override
    public Member toMemberEntity(String code) {
        String accessToken = getAccessToken(code);
        NaverUserDetailsResponseDTO.NaverUserDetailsDTO userDetails = getUserDetails(accessToken);

        return Member.builder()
                .email(new Email(userDetails.email()))
                .nickname(new Nickname(userDetails.nickname()))
                .build();
    }

    public NaverUserDetailsResponseDTO.NaverUserDetailsDTO getUserDetails(String accessToken){
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);

        ResponseEntity<NaverUserDetailsResponseDTO> response =
                restTemplate.exchange("https://openapi.naver.com/v1/nid/me", HttpMethod.GET, request, NaverUserDetailsResponseDTO.class);

        return response.getBody().naverUserDetail();
    }

    private String getAccessToken(String code){
        ResponseEntity<NaverAccessTokenResponseDTO> response =
                restTemplate.exchange(naverOAuthProperties.getRequestURL(code), HttpMethod.GET, null, NaverAccessTokenResponseDTO.class);

        //TODO : 토큰 유효성 검사 추가

        return response.getBody().accessToken();
    }
}
