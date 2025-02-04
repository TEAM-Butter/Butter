package com.ssafy.butter.domain.crew.service.genre;

import com.ssafy.butter.domain.crew.entity.Genre;
import com.ssafy.butter.domain.crew.repository.genre.GenreRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService{
    private final GenreRepository genreRepository;

    @Override
    public Optional<Genre> findByName(String name) {
        return genreRepository.findByName(name);
    }
}
