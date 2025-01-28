package com.ssafy.butter.domain.member.repository;

import com.ssafy.butter.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
