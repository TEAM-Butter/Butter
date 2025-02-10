package com.ssafy.butter.domain.crew.repository.crew;

import com.ssafy.butter.domain.crew.entity.Crew;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class CrewRepositoryImpl implements CrewRepository {

    private final CrewJpaRepository crewJpaRepository;

    @Override
    public Crew save(Crew crew) {
        return crewJpaRepository.save(crew);
    }

    @Override
    public Optional<Crew> findById(Long id) {
        return crewJpaRepository.findById(id);
    }

    @Override
    public void delete(Crew crew) {
        crewJpaRepository.delete(crew);
    }

    @Override
    public List<Crew> findAllByOrderByIdDesc(Pageable pageable) {
        return crewJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Crew> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return crewJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }
}
