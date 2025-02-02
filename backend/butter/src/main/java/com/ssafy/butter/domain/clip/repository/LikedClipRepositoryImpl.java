package com.ssafy.butter.domain.clip.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class LikedClipRepositoryImpl implements LikedClipRepository {

    private final LikedClipJpaRepository likedClipJpaRepository;
}
