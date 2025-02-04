package com.ssafy.butter.domain.crew.repository.genre;

import com.ssafy.butter.domain.crew.entity.Genre;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreJpaRepository extends JpaRepository<Genre, Long> {
    Optional<Genre> findByName(String name);
}
