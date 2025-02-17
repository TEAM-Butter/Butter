package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.clip.entity.LikedClip;
import com.ssafy.butter.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class LikedClipRepositoryImpl implements LikedClipRepository {

    private final LikedClipJpaRepository likedClipJpaRepository;

    @Override
    public LikedClip save(LikedClip clip) {
        return likedClipJpaRepository.save(clip);
    }

    @Override
    public Optional<LikedClip> findByMemberAndClip(Member member, Clip clip) {
        return likedClipJpaRepository.findByMemberAndClip(member, clip);
    }

    @Override
    public long countLikedClipByIdAndIsLiked(Long id, Boolean isLiked) {
        return likedClipJpaRepository.countLikedClipByIdAndIsLiked(id, isLiked);
    }
}
