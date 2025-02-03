package com.ssafy.butter.domain.member.service;

import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.member.dto.request.ProfileUpdateRequestDTO;
import com.ssafy.butter.domain.member.dto.response.ProfileUpdateResponseDTO;
import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TransactionalMemberService {

    private final MemberRepository memberRepository;

    /**
     * updateProfile에서 이미지 업로드 실패 시 트랙잭션 롤백을 방지하기 위해 분리한 Transactional 메서드이다
     * @param member
     * @param profileUpdateRequestDTO
     * @param imageUrl
     * @return
     */
    @Transactional
    public ProfileUpdateResponseDTO updateProfileInTransaction(Member member,
                                                                  ProfileUpdateRequestDTO profileUpdateRequestDTO,
                                                                  String imageUrl){
        List<Genre> newGenres = profileUpdateRequestDTO.genres().stream()
                .map(Genre::new)
                .toList();

        member.updateProfile(profileUpdateRequestDTO.nickname(), profileUpdateRequestDTO.gender(), imageUrl, newGenres);

        memberRepository.save(member);

        return new ProfileUpdateResponseDTO(member);
    }
}
