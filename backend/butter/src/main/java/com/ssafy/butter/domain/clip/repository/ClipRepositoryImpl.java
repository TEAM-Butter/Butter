package com.ssafy.butter.domain.clip.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ClipRepositoryImpl implements ClipRepository {

    private final ClipJpaRepository clipJpaRepository;
}
