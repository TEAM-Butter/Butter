package com.ssafy.butter.domain.live.repository;

import com.ssafy.butter.domain.live.entity.Live;

import java.util.Optional;

public interface LiveRepository {

    Live save(Live live);

    Optional<Live> findById(Long id);
}
