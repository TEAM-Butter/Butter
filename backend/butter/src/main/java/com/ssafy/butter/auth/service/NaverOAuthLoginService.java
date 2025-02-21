package com.ssafy.butter.auth.service;

import com.ssafy.butter.auth.dto.response.NaverAccessTokenResponseDTO;
import com.ssafy.butter.auth.dto.response.NaverUserDetailsResponseDTO;
import com.ssafy.butter.auth.enums.Platform;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.enums.Gender;
import com.ssafy.butter.domain.member.vo.BirthDate;
import com.ssafy.butter.domain.member.vo.Email;
import com.ssafy.butter.global.config.NaverOAuthProperties;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
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
    public Member convertUserDetailsToMemberEntity(String code) {
        String accessToken = getAccessToken(code);
        log.info("Access Token : "+accessToken);
        NaverUserDetailsResponseDTO.NaverUserDetailsDTO userDetails = getUserDetails(accessToken);

        LocalDate UserBirthDate = convertToBirthDate(userDetails.birthyear(), userDetails.birthday());
        Gender userGender = parseGender(userDetails.gender());

        return Member.builder()
                .email(new Email(userDetails.email()))
                .birthDate(new BirthDate(UserBirthDate))
                .gender(userGender)
                .createDate(LocalDate.now())
                .build();
    }

    public NaverUserDetailsResponseDTO.NaverUserDetailsDTO getUserDetails(String accessToken){
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);

        ResponseEntity<NaverUserDetailsResponseDTO> response =
                restTemplate.exchange(naverOAuthProperties.getUserInfoUri(), HttpMethod.GET, request, NaverUserDetailsResponseDTO.class);

        return response.getBody().naverUserDetail();
    }

    private String getAccessToken(String code){
        ResponseEntity<NaverAccessTokenResponseDTO> response =
                restTemplate.exchange(naverOAuthProperties.getRequestURL(code), HttpMethod.GET, null, NaverAccessTokenResponseDTO.class);

        //TODO : 토큰 유효성 검사 추가

        return response.getBody().accessToken();
    }

    private LocalDate convertToBirthDate(String birthYear, String birthdate){
        if(birthdate==null || birthdate.isEmpty() || birthYear==null || birthYear.isEmpty()){
            return null;
        }

        try {
            String fullDateString = birthYear + "-" + birthdate;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return LocalDate.parse(fullDateString, formatter);
        } catch (DateTimeException e){
            e.printStackTrace();
            return null;
        }
    }

    public static Gender parseGender(String genderStr) {
        if (genderStr == null || genderStr.isEmpty()) {
            return null;
        }

        switch (genderStr.toUpperCase()) {
            case "M":
                return Gender.MALE;
            case "F":
                return Gender.FEMALE;
            default:
                return null;
        }
    }
}
