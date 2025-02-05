package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.entity.MemberGenre;

import java.util.List;

public record ProfileUpdateResponseDTO(
        Long id,
        String profileImageUrl,
        String nickname,
        List<String> genres,
        String avatarType
) {
    public static ProfileUpdateResponseDTO from(Member member){
        List<String> genres = member.getMemberGenres().stream()
                .map(MemberGenre::getGenre)
                .map(Genre::getName)
                .toList();

        return new ProfileUpdateResponseDTO(
                member.getId(),
                member.getProfileImage(),
                member.getNickname().getValue(),
                genres,
                member.getAvatarType().getName()
        );
    }
}
