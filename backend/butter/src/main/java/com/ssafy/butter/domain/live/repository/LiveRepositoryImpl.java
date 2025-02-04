package com.ssafy.butter.domain.live.repository;

import com.ssafy.butter.domain.live.entity.Live;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class LiveRepositoryImpl implements LiveRepository {

    private final LiveJpaRepository liveJpaRepository;

    @Override
    public Live save(Live live) {
        return liveJpaRepository.save(live);
    }

    @Override
    public Optional<Live> findById(Long id) {
        return liveJpaRepository.findById(id);
    }

    @Override
    public List<Live> findAllByOrderByIdDesc(Pageable pageable) {
        return liveJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Live> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return liveJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }
}
