package com.ssafy.butter.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record NaverAccessTokenResponseDTO(
        @JsonProperty("access_token")
        String accessToken,

        @JsonProperty("refresh_token")
        String refreshToken,

        @JsonProperty("token_type")
        String tokenType,

        @JsonProperty("expires_in")
        String expiresIn,

        @JsonProperty("error")
        String error,

        @JsonProperty("error_description")
        String errorDescription
) {}