package com.ssafy.butter.domain.member.repository;

import com.ssafy.butter.domain.member.entity.Member;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository{
    private final MemberJpaRepository memberJpaRepository;

    @Override
    public Optional<Member> findById(Long memberId){
        return memberJpaRepository.findById(memberId);
    }
}
