package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ClipRepository {

    Clip save(Clip clip);

    Optional<Clip> findById(Long id);

    void delete(Clip clip);

    List<Clip> findAllByOrderByIdDesc(Pageable pageable);
    List<Clip> findAllByOrderById(Pageable pageable);

    List<Clip> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable);
    List<Clip> findAllByIdLessThanOrderById(Long id, Pageable pageable);

    List<Clip> getLikedClipList(Long memberId);
}
