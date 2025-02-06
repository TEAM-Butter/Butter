package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.member.entity.Member;
import java.time.LocalDate;

public record SignUpResponseDTO(
        String loginId,
        String email,
        LocalDate birthDate,
        String gender
) {
    public static SignUpResponseDTO from(Member member){
        return new SignUpResponseDTO(member.getLoginId(),
                member.getEmail().getValue(),
                member.getBirthDate().getDate(),
                member.getGender().name());
    }
}
