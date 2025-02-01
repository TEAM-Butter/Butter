package com.ssafy.butter.domain.live.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class LiveRepositoryImpl implements LiveRepository {

    private final LiveJpaRepository liveJpaRepository;
}
