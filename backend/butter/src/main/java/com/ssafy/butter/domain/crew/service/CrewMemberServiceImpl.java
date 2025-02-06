package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.crew.repository.CrewMemberRepository;
import com.ssafy.butter.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class CrewMemberServiceImpl implements CrewMemberService {

    private final CrewMemberRepository crewMemberRepository;

    @Override
    public CrewMember findByCrewAndMember(Crew crew, Member member) {
        return crewMemberRepository.findByCrewAndMember(crew, member).orElseThrow();
    }
}
