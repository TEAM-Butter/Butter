package com.ssafy.butter.domain.crew.repository.genre;

import com.ssafy.butter.domain.crew.entity.Genre;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GenreRepositoryImpl implements GenreRepository{

    private final GenreJpaRepository genreJpaRepository;


    @Override
    public Optional<Genre> findByName(String name) {
        return genreJpaRepository.findByName(name);
    }
}
