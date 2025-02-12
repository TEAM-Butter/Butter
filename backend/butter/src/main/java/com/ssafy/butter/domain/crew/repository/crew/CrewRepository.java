package com.ssafy.butter.domain.crew.repository.crew;

import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.entity.Crew;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CrewRepository {

    Crew save(Crew crew);

    Optional<Crew> findById(Long id);

    void delete(Crew crew);

    List<Crew> findAllByOrderByIdDesc(Pageable pageable);

    List<Crew> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);

    List<Crew> getCrewList(CrewListRequestDTO crewListRequestDTO);
}
