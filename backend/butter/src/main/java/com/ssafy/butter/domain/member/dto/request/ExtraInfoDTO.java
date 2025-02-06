package com.ssafy.butter.domain.member.dto.request;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public record ExtraInfoDTO(
        String nickname,
        MultipartFile profileImage,
        String avatarType,
        List<String> genres
) {
}
