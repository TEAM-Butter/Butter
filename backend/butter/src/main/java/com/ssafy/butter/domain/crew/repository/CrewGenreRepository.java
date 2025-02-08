package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.CrewGenre;

import java.util.List;

public interface CrewGenreRepository {

    List<CrewGenre> saveAll(Iterable<CrewGenre> crewGenres);
}
