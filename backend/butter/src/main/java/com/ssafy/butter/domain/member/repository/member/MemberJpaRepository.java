package com.ssafy.butter.domain.member.repository.member;

import com.ssafy.butter.domain.member.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(Long memberId);

    @Query("SELECT m FROM Member m WHERE m.email.value = :email")
    Optional<Member> findByEmail(@Param("email") String email);

    Optional<Member> findByNickname(String nickname);
}
