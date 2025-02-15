package com.ssafy.butter.domain.member.repository.member;

import com.ssafy.butter.domain.member.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(Long memberId);

    @Query("SELECT m FROM Member m WHERE m.email.value = :email")
    Optional<Member> findByEmail(@Param("email") String email);

    @Query("SELECT m FROM Member m WHERE m.nickname.value = :nickname")
    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByLoginId(String loginId);

    @Query("SELECT m FROM Member m WHERE UPPER(CAST(m.nickname AS string)) LIKE UPPER(CONCAT('%', :keyword, '%'))")
    Page<Member> searchByNickname(@Param("keyword") String keyword, Pageable pageable);
}
