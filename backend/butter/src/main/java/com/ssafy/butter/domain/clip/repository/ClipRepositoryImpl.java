package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ClipRepositoryImpl implements ClipRepository {

    private final ClipJpaRepository clipJpaRepository;

    @Override
    public Clip save(Clip clip) {
        return clipJpaRepository.save(clip);
    }

    @Override
    public Optional<Clip> findById(Long id) {
        return clipJpaRepository.findById(id);
    }

    @Override
    public List<Clip> findAllByOrderByIdDesc(Pageable pageable) {
        return clipJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Clip> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return clipJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }
}
