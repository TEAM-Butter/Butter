package com.ssafy.butter.domain.crew.entity;

import com.ssafy.butter.domain.crew.entity.Genre;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CrewGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_genre_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    @NotNull
    private Genre genre;

    @Builder
    public CrewGenre(Genre genre) {
        this.genre = genre;
    }

}
