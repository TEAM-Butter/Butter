package com.ssafy.butter.domain.member.dto.response;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.entity.MemberGenre;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MyPageResponseDTO {
    private final String email;
    private final String nickname;
    private final LocalDate birthDate;
    private final String imageUrl;
    private final List<MemberGenre> memberGenres;

    @Builder
    public MyPageResponseDTO(Member member) {
        this.email = member.getEmail().getValue();
        this.nickname = member.getNickname().getValue();
        this.birthDate = member.getBirthDate().getDate();
        this.imageUrl = member.getImageUrl();
        this.memberGenres = member.getMemberGenres();
    }
}
