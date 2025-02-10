package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewGenre;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CrewGenreRepositoryImpl implements CrewGenreRepository {

    private final CrewGenreJpaRepository crewGenreJpaRepository;

    @Override
    public List<CrewGenre> saveAll(Iterable<CrewGenre> crewGenres) {
        return crewGenreJpaRepository.saveAll(crewGenres);
    }

    @Override
    public void deleteAllByCrew(Crew crew) {
        crewGenreJpaRepository.deleteAllByCrew(crew);
    }
}
