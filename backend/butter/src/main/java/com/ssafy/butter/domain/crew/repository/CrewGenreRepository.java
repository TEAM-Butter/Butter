package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.crew.entity.CrewGenre;

import java.util.List;

public interface CrewGenreRepository {

    List<CrewGenre> saveAll(Iterable<CrewGenre> crewGenres);

    void deleteAllByCrew(Crew crew);
}
