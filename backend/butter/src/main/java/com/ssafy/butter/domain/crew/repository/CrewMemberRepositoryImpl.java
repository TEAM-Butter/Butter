package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class CrewMemberRepositoryImpl implements CrewMemberRepository {

    private final CrewMemberJpaRepository crewMemberJpaRepository;

    @Override
    public CrewMember save(CrewMember crewMember) {
        return crewMemberJpaRepository.save(crewMember);
    }

    @Override
    public void delete(CrewMember crewMember) {
        crewMemberJpaRepository.delete(crewMember);
    }

    @Override
    public Optional<CrewMember> findByCrewAndMember(Crew crew, Member member) {
        return crewMemberJpaRepository.findByCrewAndMember(crew, member);
    }
}
