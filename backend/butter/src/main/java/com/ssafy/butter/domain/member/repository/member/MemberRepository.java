package com.ssafy.butter.domain.member.repository.member;

import com.ssafy.butter.domain.member.entity.Member;
import com.ssafy.butter.domain.member.vo.Email;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberRepository {

    Member save(Member member);
    Optional<Member> findById(Long memberId);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
    Optional<Member> findByLoginId(String loginId);
    Page<Member> searchByNickname(String keyword, Pageable pageable);
}
