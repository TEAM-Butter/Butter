package com.ssafy.butter.domain.member.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository{
    private final MemberJpaRepository memberJpaRepository;


}
