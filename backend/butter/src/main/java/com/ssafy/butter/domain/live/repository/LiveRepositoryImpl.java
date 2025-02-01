package com.ssafy.butter.domain.live.repository;

import com.ssafy.butter.domain.live.entity.Live;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class LiveRepositoryImpl implements LiveRepository {

    private final LiveJpaRepository liveJpaRepository;

    @Override
    public Live save(Live live) {
        return liveJpaRepository.save(live);
    }
}
