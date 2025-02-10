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
        return jpaQueryFactory.selectFrom(qCrew)
                .where(createCrewListCondition(crewListRequestDTO))
                .limit(crewListRequestDTO.pageSize())
                .fetch();
    }

    private BooleanExpression[] createCrewListCondition(CrewListRequestDTO crewListRequestDTO) {
        String[] keywords = crewListRequestDTO.keyword().split(" ");
        Genre genre = jpaQueryFactory.selectFrom(qGenre)
                .innerJoin(qCrew)
                .where(qGenre.name.eq(crewListRequestDTO.genre()))
                .fetchOne();
        return new BooleanExpression[] {
                crewListRequestDTO.crewId() == null ? null : qCrew.id.lt(crewListRequestDTO.crewId()),
                Arrays.stream(keywords).map(qCrew.name::contains).reduce(BooleanExpression::and).orElse(null),
        };
    }
}
