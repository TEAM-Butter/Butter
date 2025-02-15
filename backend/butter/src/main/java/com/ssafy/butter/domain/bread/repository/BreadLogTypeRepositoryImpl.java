package com.ssafy.butter.domain.bread.repository;

import com.ssafy.butter.domain.bread.entity.BreadLogType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class BreadLogTypeRepositoryImpl implements BreadLogTypeRepository {

    private final BreadLogTypeJpaRepository breadLogTypeJpaRepository;

    @Override
    public Optional<BreadLogType> findByName(String name) {
        return breadLogTypeJpaRepository.findByName(name);
    }
}
