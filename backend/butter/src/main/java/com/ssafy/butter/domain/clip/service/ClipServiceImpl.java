package com.ssafy.butter.domain.clip.service;

import com.ssafy.butter.domain.clip.repository.ClipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ClipServiceImpl implements ClipService {

    private final ClipRepository clipRepository;
}
