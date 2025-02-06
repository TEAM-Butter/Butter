package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.entity.MemberGenre;
import java.time.LocalDate;
import java.util.List;

public record MyPageResponseDTO(
        String loginId,
        String email,
        LocalDate birthdate,
        String gender,
        String profileImageUrl,
        String nickname,
        List<String> genres,
        String avatarType,
        boolean isExtraInfoRegistered
) {
    public static MyPageResponseDTO from(Member member){
        List<String> genres = member.getMemberGenres().stream()
                .map(MemberGenre::getGenre)
                .map(Genre::getName)
                .toList();

        return new MyPageResponseDTO(
                member.getLoginId(),
                member.getEmail().getValue(),
                member.getBirthDate().getDate(),
                member.getGender().name(),
                member.getProfileImage(),
                member.getNickname().getValue(),
                genres,
                member.getAvatarType().getName(),
                member.isExtraInfoRegistered());
    }
}
