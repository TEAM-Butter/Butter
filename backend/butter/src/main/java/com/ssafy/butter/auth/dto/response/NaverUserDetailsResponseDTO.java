package com.ssafy.butter.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record NaverUserDetailsResponseDTO(
        @JsonProperty("resultcode") String resultCode,
        @JsonProperty("message") String message,
        @JsonProperty("response") NaverUserDetailsDTO naverUserDetail
) {
    public static record NaverUserDetailsDTO(
        String id,
        String nickname,
        String email,
        String mobile
    ){}
}
