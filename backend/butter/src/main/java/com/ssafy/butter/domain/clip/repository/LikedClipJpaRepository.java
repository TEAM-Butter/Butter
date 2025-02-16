package com.ssafy.butter.domain.clip.repository;

import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.clip.entity.LikedClip;
import com.ssafy.butter.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikedClipJpaRepository extends JpaRepository<LikedClip, Long> {

    Optional<LikedClip> findByMemberAndClip(Member member, Clip clip);

    long countLikedClipByIdAndIsLiked(Long id, @NotNull Boolean isLiked);
}
