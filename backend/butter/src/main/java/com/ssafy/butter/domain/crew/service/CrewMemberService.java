package com.ssafy.butter.domain.crew.service;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewMember;
import com.ssafy.butter.domain.member.entity.Member;

import java.util.List;
import java.util.Optional;

public interface CrewMemberService {

    CrewMember findByCrewAndMember(Crew crew, Member member);

    List<CrewMember> findByMember(Member member);
}
