package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.entity.MemberGenre;

import java.util.List;

public record ProfileUpdateResponseDTO(
        Long id,
        String nickname,
        String profileImageUrl,
        String avatarType,
        List<String> genres
) {
    public static ProfileUpdateResponseDTO from(Member member){
        List<String> genres = member.getMemberGenres().stream()
                .map(MemberGenre::getGenre)
                .map(Genre::getName)
                .toList();
        return new ProfileUpdateResponseDTO(
                member.getId(),
                member.getNickname().getValue(),
                member.getProfileImage(),
                member.getAvatarType().getName(),
                genres);
    }
}
