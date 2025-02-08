package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CrewGenreRequestDTO(

        @NotNull
        Long crewId,

        @NotNull
        List<String> genreNames) {
}
