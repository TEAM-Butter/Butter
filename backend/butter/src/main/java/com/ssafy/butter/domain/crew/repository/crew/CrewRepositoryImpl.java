package com.ssafy.butter.domain.crew.repository.crew;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
@Slf4j
public class CrewRepositoryImpl implements CrewRepository {

    private static final String SORT_CONDITION_FOLLOWER_COUNT = "followerCount";
    private static final String SORT_CONDITION_CREATE_DATE = "createDate";

    private final QCrew qCrew = QCrew.crew;
    private final QGenre qGenre = QGenre.genre;
    private final QCrewGenre qCrewGenre = QCrewGenre.crewGenre;

    private final JPAQueryFactory jpaQueryFactory;
    private final CrewJpaRepository crewJpaRepository;

    @Override
    public Crew save(Crew crew) {
        return crewJpaRepository.save(crew);
    }

    @Override
    public Optional<Crew> findById(Long id) {
        return crewJpaRepository.findById(id);
    }

    @Override
    public void delete(Crew crew) {
        crewJpaRepository.delete(crew);
    }

    @Override
    public List<Crew> findAllByOrderByIdDesc(Pageable pageable) {
        return crewJpaRepository.findAllByOrderByIdDesc(pageable);
    }

    @Override
    public List<Crew> findAllByIdLessThanOrderByIdDesc(Long id, Pageable pageable) {
        return crewJpaRepository.findAllByIdLessThanOrderByIdDesc(id, pageable);
    }

    @Override
    public List<Crew> getCrewList(CrewListRequestDTO crewListRequestDTO) {
        return jpaQueryFactory.selectDistinct(qCrew)
                .from(qCrew)
                .join(qCrew.crewGenres, qCrewGenre).fetchJoin()
                .join(qCrewGenre.genre, qGenre).fetchJoin()
                .where(createCrewListCondition(crewListRequestDTO))
                .orderBy(createCrewListOrderCondition(crewListRequestDTO))
                .limit(crewListRequestDTO.pageSize())
                .fetch();
    }

    private BooleanBuilder createCrewListCondition(CrewListRequestDTO crewListRequestDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (crewListRequestDTO.crewId() != null) {
            booleanBuilder.and(createCrewListCursorCondition(crewListRequestDTO));
        }
        // 크루 이름 검색 조건
        if (crewListRequestDTO.keyword() != null) {
            booleanBuilder.and(createCrewListNameCondition(crewListRequestDTO));
        }
        // 크루 장르 검색 조건
        if (crewListRequestDTO.genre() != null) {
            booleanBuilder.and(qGenre.name.eq(crewListRequestDTO.genre()));
        }
        return booleanBuilder;
    }

    private BooleanBuilder createCrewListCursorCondition(CrewListRequestDTO crewListRequestDTO) {
        // 커서 기반 페이징을 위한 조건
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        Crew cursor = crewJpaRepository.findById(crewListRequestDTO.crewId()).orElseThrow();
        switch (crewListRequestDTO.sortBy()) {
            case SORT_CONDITION_FOLLOWER_COUNT:
                booleanBuilder.and(qCrew.follows.size().lt(cursor.getFollows().size()).or(
                        qCrew.follows.size().loe(cursor.getFollows().size()).and(qCrew.id.gt(cursor.getId()))
                ));
                break;
            case SORT_CONDITION_CREATE_DATE:
                booleanBuilder.and(qCrew.createDate.lt(cursor.getCreateDate()));
                break;
            default:
        }
        return booleanBuilder.and(qCrew.id.lt(crewListRequestDTO.crewId()));
    }

    private BooleanBuilder createCrewListNameCondition(CrewListRequestDTO crewListRequestDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        String[] keywords = crewListRequestDTO.keyword().split(" ");
        for (String keyword : keywords) {
            booleanBuilder.and(qCrew.name.contains(keyword));
        }
        return booleanBuilder;
    }

    private OrderSpecifier<?>[] createCrewListOrderCondition(CrewListRequestDTO crewListRequestDTO) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();
        switch (crewListRequestDTO.sortBy()) {
            case SORT_CONDITION_FOLLOWER_COUNT:
                orderSpecifiers.add(qCrew.follows.size().desc());
                break;
            case SORT_CONDITION_CREATE_DATE:
                orderSpecifiers.add(qCrew.createDate.desc());
                break;
            default:
                orderSpecifiers.add(qCrew.createDate.desc());
        }
        orderSpecifiers.add(qCrew.id.asc());
        return orderSpecifiers.toArray(OrderSpecifier[]::new);
    }
}
