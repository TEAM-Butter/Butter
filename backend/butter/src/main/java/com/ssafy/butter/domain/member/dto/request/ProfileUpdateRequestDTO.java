package com.ssafy.butter.domain.member.dto.request;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public record ProfileUpdateRequestDTO(
        String nickname,
        String gender,
        MultipartFile profileImage,
        List<String> genres
) {
}
