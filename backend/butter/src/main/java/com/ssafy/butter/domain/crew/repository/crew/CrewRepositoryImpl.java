package com.ssafy.butter.domain.crew.repository.crew;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class CrewRepositoryImpl implements CrewRepository {

    private static final QCrew qCrew = QCrew.crew;
    private static final QGenre qGenre = QGenre.genre;
    private static final QCrewGenre qCrewGenre = QCrewGenre.crewGenre;

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
                .join(qCrew.crewGenres, qCrewGenre)
                .join(qCrewGenre.genre, qGenre)
                .where(createCrewListCondition(crewListRequestDTO))
                .orderBy(createCrewListOrderCondition(crewListRequestDTO))
                .limit(crewListRequestDTO.pageSize())
                .fetch();
    }

    private BooleanBuilder createCrewListCondition(CrewListRequestDTO crewListRequestDTO) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        // 커서 기반 페이징을 위한 조건
        if (crewListRequestDTO.crewId() != null) {
            booleanBuilder.and(qCrew.id.lt(crewListRequestDTO.crewId()));
        }
        // 크루 이름 검색 조건
        if (crewListRequestDTO.keyword() != null) {
            String[] keywords = crewListRequestDTO.keyword().split(" ");
            for (String keyword : keywords) {
                booleanBuilder.and(qCrew.name.contains(keyword));
            }
        }
        // 크루 장르 검색 조건
        if (crewListRequestDTO.genre() != null) {
            booleanBuilder.and(qGenre.name.eq(crewListRequestDTO.genre()));
        }
        return booleanBuilder;
    }

    private OrderSpecifier<?> createCrewListOrderCondition(CrewListRequestDTO crewListRequestDTO) {
        switch (crewListRequestDTO.sortBy()) {
            case "follow":
                return new OrderSpecifier<>(Order.DESC, qCrew.follows.size());
            case "createDate":
                return new OrderSpecifier<>(Order.DESC, qCrew.createDate);
            default:
                return null;
        }
    }
}
