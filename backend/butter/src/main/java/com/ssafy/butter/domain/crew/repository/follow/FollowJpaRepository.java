package com.ssafy.butter.domain.crew.repository.follow;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowJpaRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByCrewAndMember(Crew crew, Member member);

    Long countFollowByCrewIdAndIsFollowed(Long crewId, @NotNull Boolean isFollowed);
}
