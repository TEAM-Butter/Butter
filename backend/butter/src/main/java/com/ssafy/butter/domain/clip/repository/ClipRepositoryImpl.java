package com.ssafy.butter.domain.clip.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.clip.entity.Clip;
import com.ssafy.butter.domain.clip.entity.QClip;
import com.ssafy.butter.domain.clip.entity.QLikedClip;
import com.ssafy.butter.domain.member.entity.QMember;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ClipRepositoryImpl implements ClipRepository {

    private final QClip qClip = QClip.clip;
    private final QLikedClip qLikedClip = QLikedClip.likedClip;
    private final QMember qMember = QMember.member;

    private final ClipJpaRepository clipJpaRepository;

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Clip save(Clip clip) {
        return clipJpaRepository.save(clip);
    }

    @Override
    public Optional<Clip> findById(Long id) {
        return clipJpaRepository.findById(id);
    }

    @Override
    public void delete(Clip clip) {
        clipJpaRepository.delete(clip);
    }

    @Override
    public List<Clip> findAllByOrderByIdDesc(Pageable pageable) {
        return clipJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Clip> findAllByOrderById(Pageable pageable) {
        return clipJpaRepository.findAllByOrderById(pageable);
    }

    @Override
    public List<Clip> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return clipJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }

    @Override
    public List<Clip> findAllByIdLessThanOrderById(Long id, Pageable pageable) {
        return clipJpaRepository.findAllByIdLessThanOrderById(id, pageable);
    }

    @Override
    public List<Clip> getLikedClipList(Long memberId) {
        return jpaQueryFactory.selectDistinct(qClip)
                .from(qClip)
                .join(qClip.likedClips, qLikedClip).fetchJoin()
                .join(qLikedClip.member, qMember).fetchJoin()
                .where(createLikedClipListCondition(memberId))
                .orderBy(qLikedClip.id.desc())
                .fetch();
    }

    private BooleanBuilder createLikedClipListCondition(Long memberId) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qMember.id.eq(memberId))
                .and(qLikedClip.isLiked);
        return booleanBuilder;
    }
}
