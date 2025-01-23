package com.ssafy.butter.domain.crew.entity;

import com.ssafy.butter.domain.crew.entity.Genre;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class CrewGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long crewGenreId;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    @NotNull
    private Genre genre;

    @Builder
    public CrewGenre(Genre genre) {
        this.genre = genre;
    }

}
