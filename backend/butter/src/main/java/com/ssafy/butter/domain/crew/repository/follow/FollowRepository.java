package com.ssafy.butter.domain.crew.repository.follow;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;

import java.util.Optional;

public interface FollowRepository {

    Follow save(Follow follow);

    void delete(Follow follow);

    Optional<Follow> findByCrewAndMember(Crew crew, Member member);

    Long countFollowByCrewIdAndIsFollowed(Long crewId, @NotNull Boolean isFollowed);
}
