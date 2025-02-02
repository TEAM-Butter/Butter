package com.ssafy.butter.domain.clip.service;

import com.ssafy.butter.domain.clip.dto.request.ClipSaveRequestDTO;
import com.ssafy.butter.domain.clip.dto.response.ClipResponseDTO;
import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.clip.repository.ClipRepository;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.live.service.LiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ClipServiceImpl implements ClipService {

    private final LiveService liveService;

    private final ClipRepository clipRepository;

    @Override
    public ClipResponseDTO createClip(ClipSaveRequestDTO clipSaveRequestDTO) {
        Live live = liveService.findById(clipSaveRequestDTO.liveId());
        Clip clip = Clip.builder()
                .live(live)
                .title(clipSaveRequestDTO.title())
                .videoUrl("")
                .hitCount(0L)
                .build();
        Clip savedClip = clipRepository.save(clip);

        String filenamePrefix = savedClip.getId() + "_" + System.currentTimeMillis() + "_";
        String videoUrl = filenamePrefix + clipSaveRequestDTO.video().getOriginalFilename();
        savedClip.updateVideoUrl(videoUrl);
        return ClipResponseDTO.fromEntity(clipRepository.save(savedClip));
    }
}
