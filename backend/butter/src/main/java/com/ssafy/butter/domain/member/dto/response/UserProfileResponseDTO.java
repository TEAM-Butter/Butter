package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.entity.MemberGenre;
import java.time.LocalDate;
import java.util.List;

public record UserProfileResponseDTO(
        String loginId,
        String gender,
        String email,
        String nickname,
        LocalDate birthdate,
        String profileImage,
        List<String> genres,
        boolean isExtraInfoRegistered
) {
    public static UserProfileResponseDTO from(Member member){
        List<String> genres = member.getMemberGenres().stream()
                .map(memberGenre -> memberGenre.getGenre().getName())
                .toList();

        return new UserProfileResponseDTO(
                member.getLoginId(),
                member.getGender().name(),
                member.getEmail().getValue(),
                member.getNickname().getValue(),
                member.getBirthDate().getDate(),
                member.getProfileImage(),
                genres,
                member.isExtraInfoRegistered());
    }
}