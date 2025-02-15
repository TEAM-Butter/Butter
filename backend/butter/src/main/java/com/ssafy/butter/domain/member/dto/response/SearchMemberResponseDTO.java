package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.member.entity.Member;

public record SearchMemberResponseDTO(
        String nickname,
        Long id
) {
    public static SearchMemberResponseDTO from(Member member) {
        return new SearchMemberResponseDTO(
                member.getNickname().getValue(),
                member.getId()
        );
    }
}
