package com.ssafy.butter.domain.crew.repository.genre;

import com.ssafy.butter.domain.crew.entity.Genre;
import java.util.Optional;

public interface GenreRepository {
    Optional<Genre> findByName(String name);
}
