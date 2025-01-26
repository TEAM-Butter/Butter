package com.ssafy.butter.domain.member.repository;

import com.ssafy.butter.domain.member.entity.Member;
import java.util.Optional;

public interface MemberRepository {
    public Optional<Member> findById(Long memberId);
}
