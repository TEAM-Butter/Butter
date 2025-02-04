package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.entity.MemberGenre;
import java.time.LocalDate;
import java.util.List;

public record UserProfileResponseDTO(
        String email,
        String nickname,
        LocalDate birthdate,
        String profileImage,
        List<MemberGenre> memberGenres,
        boolean isExtraInfoRegistered
) {
    public static UserProfileResponseDTO from(Member member){
        return new UserProfileResponseDTO(member.getEmail().getValue(),
                member.getNickname().getValue(),
                member.getBirthDate().getDate(),
                member.getProfileImage(),
                member.getMemberGenres(),
                member.isExtraInfoRegistered());
    }
}
