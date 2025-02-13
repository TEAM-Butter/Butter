package com.ssafy.butter.domain.crew.dto.response;

import com.ssafy.butter.domain.member.entity.Member;

public record CrewMemberResponseDTO(
        Long id,
        String memberType,
        String avatarType,
        String nickname,
        String profileImage,
        String gender
) {

    public static CrewMemberResponseDTO from(Member member) {
        return new CrewMemberResponseDTO(
                member.getId(),
                member.getMemberType().getName(),
                member.getAvatarType().getName(),
                member.getNickname().getValue(),
                member.getProfileImage(),
                member.getGender().name()
        );
    }
}