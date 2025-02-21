package com.ssafy.butter.domain.member.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record ProfileUpdateRequestDTO(
        @NotNull
        String nickname,
        MultipartFile profileImage,

        @NotNull
        String avatarType,

        @NotNull
        List<String> genres
) {
}
