package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.member.entity.Member;

public record ProfileUpdateResponseDTO(
        Long id,
        String nickname,
        String gender,
        String profileImage
) {
    public ProfileUpdateResponseDTO(Member member){
        this(member.getId(), member.getNickname().getValue(), member.getGender().name(), member.getProfileImage());
    }
}
