package com.ssafy.butter.domain.crew.repository;

import com.ssafy.butter.domain.crew.entity.Notice;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class NoticeRepositoryImpl implements NoticeRepository {

    private final NoticeJpaRepository noticeJpaRepository;

    @Override
    public Notice save(Notice notice) {
        return noticeJpaRepository.save(notice);
    }

    @Override
    public Optional<Notice> findById(Long id) {
        return noticeJpaRepository.findById(id);
    }

    @Override
    public void delete(Notice notice) {
        noticeJpaRepository.delete(notice);
    }

    @Override
    public List<Notice> findAllByOrderByIdDesc(Pageable pageable) {
        return noticeJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Notice> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return noticeJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }
}
