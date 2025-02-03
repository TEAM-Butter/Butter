package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.member.entity.Member;

import java.util.Optional;

public interface CrewMemberRepository {

    CrewMember save(CrewMember crewMember);

    void delete(CrewMember crewMember);

    Optional<CrewMember> findByCrewAndMember(Crew crew, Member member);
}
