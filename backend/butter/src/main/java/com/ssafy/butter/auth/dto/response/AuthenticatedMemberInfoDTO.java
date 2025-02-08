package com.ssafy.butter.auth.dto.response;

import java.util.List;

public record AuthenticatedMemberInfoDTO(
        String nickname,
        String profileImage,
        String avatarType,
        String memberType,
        List<String> genres,
        boolean isExtraInfoRegistered
) {
}