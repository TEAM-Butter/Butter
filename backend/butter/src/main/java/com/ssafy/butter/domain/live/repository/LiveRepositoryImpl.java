package com.ssafy.butter.domain.live.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.crew.entity.QCrew;
import com.ssafy.butter.domain.crew.entity.QCrewGenre;
import com.ssafy.butter.domain.crew.entity.QGenre;
import com.ssafy.butter.domain.live.dto.request.LiveListRequestDTO;
import com.ssafy.butter.domain.live.entity.Live;
import com.ssafy.butter.domain.live.entity.QLive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class LiveRepositoryImpl implements LiveRepository {

    private final QLive qLive = QLive.live;
    private final QCrew qCrew = QCrew.crew;
    private final QCrewGenre qCrewGenre = QCrewGenre.crewGenre;
    private final QGenre qGenre = QGenre.genre;

    private final JPAQueryFactory jpaQueryFactory;
    private final LiveJpaRepository liveJpaRepository;

    @Override
    public Live save(Live live) {
        return liveJpaRepository.save(live);
    }

    @Override
    public Optional<Live> findById(Long id) {
        return liveJpaRepository.findById(id);
    }

    @Override
    public List<Live> findAllByOrderByIdDesc(Pageable pageable) {
        return liveJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Live> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return liveJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }

    @Override
    public List<Live> getActiveLiveList(LiveListRequestDTO liveListRequestDTO) {
        return jpaQueryFactory.selectFrom(qLive)
                .join(qCrew).fetchJoin()
                .on(qLive.crew.id.eq(qCrew.id))
                .join(qCrewGenre).fetchJoin()
                .on(qCrew.id.eq(qCrewGenre.crew.id))
                .join(qGenre).fetchJoin()
                .on(qCrewGenre.genre.id.eq(qGenre.id))
                .where(createActiveLiveListCondition(liveListRequestDTO), qLive.endDate.isNull())
                .fetch();
    }

    @Override
    public List<Live> getActiveLiveListOrderByStartDate(LiveListRequestDTO liveListRequestDTO) {
        return jpaQueryFactory.selectFrom(qLive)
                .join(qCrew).fetchJoin()
                .on(qLive.crew.id.eq(qCrew.id))
                .join(qCrewGenre).fetchJoin()
                .on(qCrew.id.eq(qCrewGenre.crew.id))
                .join(qGenre).fetchJoin()
                .on(qCrewGenre.genre.id.eq(qGenre.id))
                .where(createActiveLiveListCondition(liveListRequestDTO), qLive.endDate.isNull())
                .orderBy(qLive.startDate.desc())
                .limit(liveListRequestDTO.pageSize())
                .fetch();
    }

    private BooleanBuilder createActiveLiveListCondition(LiveListRequestDTO liveListRequestDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        // 커서 기반 페이징을 위한 조건
        if (liveListRequestDTO.liveId() != null) {
            Live live = liveJpaRepository.findById(liveListRequestDTO.liveId()).orElseThrow();
            booleanBuilder.and(qLive.startDate.lt(live.getStartDate()));
        }
        //  라이브명 검색 조건
        if (liveListRequestDTO.title() != null) {
            String[] keywords = liveListRequestDTO.title().split(" ");
            for (String keyword : keywords) {
                booleanBuilder.and(qLive.title.contains(keyword));
            }
        }
        // 크루명 검색 조건
        if (liveListRequestDTO.crewName() != null) {
            String[] keywords = liveListRequestDTO.crewName().split(" ");
            for (String keyword : keywords) {
                booleanBuilder.and(qLive.crew.name.contains(keyword));
            }
        }
        // 크루 장르 검색 조건
        if (liveListRequestDTO.crewGenre() != null) {
            booleanBuilder.and(qGenre.name.eq(liveListRequestDTO.crewGenre()));
        }
        return booleanBuilder;
    }
}
