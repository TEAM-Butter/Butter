package com.ssafy.butter.domain.crew.repository.crew;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.butter.domain.crew.dto.request.CrewListRequestDTO;
import com.ssafy.butter.domain.crew.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
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
                .orderBy()
                .limit(crewListRequestDTO.pageSize())
                .fetch();
    }

    private BooleanExpression[] createCrewListCondition(CrewListRequestDTO crewListRequestDTO) {
        String[] keywords = crewListRequestDTO.keyword().split(" ");
        return new BooleanExpression[] {
                // 커서 기반 페이징을 위한 조건
                crewListRequestDTO.crewId() == null ? null : qCrew.id.lt(crewListRequestDTO.crewId()),
                // 크루 이름이 모든 키워드를 포함하는지
                Arrays.stream(keywords).map(qCrew.name::contains).reduce(BooleanExpression::and).orElse(null),
                // 크루가 장르를 갖고 있는지
                qGenre.name.eq(crewListRequestDTO.genre()),
        };
    }

    // TODO 크루 목록 정렬 기준
}
