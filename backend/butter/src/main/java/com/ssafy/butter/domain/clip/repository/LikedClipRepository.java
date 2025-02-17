package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.clip.entity.LikedClip;
import com.ssafy.butter.domain.member.entity.Member;

import jakarta.validation.constraints.NotNull;
import java.util.Optional;

public interface LikedClipRepository {

    LikedClip save(LikedClip clip);

    Optional<LikedClip> findByMemberAndClip(Member member, Clip clip);

    long countLikedClipByIdAndIsLiked(Long id, @NotNull Boolean isLiked);
}
