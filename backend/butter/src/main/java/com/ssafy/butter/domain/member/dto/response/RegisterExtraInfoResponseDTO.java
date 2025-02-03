package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.member.entity.Member;
import java.util.List;

public record RegisterExtraInfoResponseDTO(
        String nickname,
        String profileImage,
        String avatarType,
        List<String> genres
) {
    public static RegisterExtraInfoResponseDTO from(Member member){
        List<String> genres = member.getMemberGenres().stream()
                .map(memberGenre -> memberGenre.getGenre().getName())
                .toList();

        return new RegisterExtraInfoResponseDTO(member.getNickname().getValue(),
                member.getProfileImage(),
                member.getAvatarType().getName(),
                genres);
    }
}
