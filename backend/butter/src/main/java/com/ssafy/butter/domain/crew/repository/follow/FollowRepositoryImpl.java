package com.ssafy.butter.domain.crew.repository.follow;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.Follow;
import com.ssafy.butter.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class FollowRepositoryImpl implements FollowRepository {

    private final FollowJpaRepository followJpaRepository;

    @Override
    public Follow save(Follow follow) {
        return followJpaRepository.save(follow);
    }

    @Override
    public void delete(Follow follow) {
        followJpaRepository.delete(follow);
    }

    @Override
    public Optional<Follow> findByCrewAndMember(Crew crew, Member member) {
        return followJpaRepository.findByCrewAndMember(crew, member);
    }

    @Override
    public Long countFollowByCrewIdAndIsFollowed(Long crewId, Boolean isFollowed) {
        return followJpaRepository.countFollowByCrewIdAndIsFollowed(crewId, isFollowed);
    }
}
