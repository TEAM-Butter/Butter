package com.ssafy.butter.domain.bread.repository;

import com.ssafy.butter.domain.bread.entity.BreadLog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class BreadLogRepositoryImpl implements BreadLogRepository {

    private final BreadLogJpaRepository breadLogJpaRepository;

    @Override
    public BreadLog save(BreadLog breadLog) {
        return breadLogJpaRepository.save(breadLog);
    }
}
