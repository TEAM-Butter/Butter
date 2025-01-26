package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.CrewMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewMemberRepository extends JpaRepository<CrewMember, Long> {
}
