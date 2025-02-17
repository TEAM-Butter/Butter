package com.ssafy.butter.domain.live.repository;

import com.ssafy.butter.domain.crew.entity.Crew;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.entity.Live;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface LiveRepository {

    Live save(Live live);

    Optional<Live> findById(Long id);

    List<Live> findAllByOrderByIdDesc(Pageable pageable);

    List<Live> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);

    List<Live> getActiveLiveList(LiveListRequestDTO liveListRequestDTO);

    List<Live> getActiveLiveListOrderByStartDate(LiveListRequestDTO liveListRequestDTO);

    Optional<Live> findByCrewAndEndDateIsNull(Crew crew);
}
