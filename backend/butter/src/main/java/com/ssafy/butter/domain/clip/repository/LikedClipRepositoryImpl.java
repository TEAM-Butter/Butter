package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.LikedClip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class LikedClipRepositoryImpl implements LikedClipRepository {

    private final LikedClipJpaRepository likedClipJpaRepository;

    @Override
    public LikedClip save(LikedClip clip) {
        return likedClipJpaRepository.save(clip);
    }
}
