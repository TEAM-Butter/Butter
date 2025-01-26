package com.ssafy.butter.domain.member.repository;

import com.ssafy.butter.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(Long memberId);
}
