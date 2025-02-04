package com.ssafy.butter.domain.crew.service.genre;

import com.ssafy.butter.domain.crew.entity.Genre;
import java.util.Optional;

public interface GenreService {
    Optional<Genre> findByName(String name);
}
