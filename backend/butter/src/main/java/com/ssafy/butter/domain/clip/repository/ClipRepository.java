package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;

import java.util.Optional;

public interface ClipRepository {

    Clip save(Clip clip);

    Optional<Clip> findById(Long id);
}
