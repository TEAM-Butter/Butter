package com.ssafy.butter.domain.member.repository;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.infrastructure.emailAuth.entity.EmailAuth;
import java.util.Optional;

public interface MemberRepository {
    public Member save(Member member);
    public Optional<Member> findById(Long memberId);
    Optional<Member> findByEmail(String email);
}
