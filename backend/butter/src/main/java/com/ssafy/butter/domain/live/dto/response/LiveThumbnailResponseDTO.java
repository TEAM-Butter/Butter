package com.ssafy.butter.domain.live.dto.response;

import com.ssafy.butter.domain.live.entity.Live;

public record LiveThumbnailResponseDTO(

        String thumbnailUrl
) {

    public static LiveThumbnailResponseDTO from(Live live) {
        return new LiveThumbnailResponseDTO(live.getThumbnailUrl());
    }
}
