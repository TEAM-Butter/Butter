package com.ssafy.butter.domain.live.service;

import com.ssafy.butter.domain.live.repository.LiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class LiveServiceImpl implements LiveService {

    private final LiveRepository liveRepository;
}
