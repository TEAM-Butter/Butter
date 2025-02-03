package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CrewMemberRepository extends JpaRepository<CrewMember, Long> {

    Optional<CrewMember> findByCrewAndMember(Crew crew, Member member);
}
