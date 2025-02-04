package com.ssafy.butter.domain.member.dto.request;

import java.util.List;

public record ExtraInfoDTO(
        String nickname,
        String profileImage,
        String avatarType,
        List<String> genres
) {
}
