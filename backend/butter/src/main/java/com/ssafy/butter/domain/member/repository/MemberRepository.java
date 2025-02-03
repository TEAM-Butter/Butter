package com.ssafy.butter.domain.member.repository;

import com.ssafy.butter.domain.member.entity.Member;
import java.util.Optional;

public interface MemberRepository {

    Member save(Member member);
    Optional<Member> findById(Long memberId);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
}
