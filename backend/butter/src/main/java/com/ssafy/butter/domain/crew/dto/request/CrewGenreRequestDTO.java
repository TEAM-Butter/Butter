package com.ssafy.butter.domain.crew.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record CrewGenreRequestDTO(

        @NotNull
        Set<String> genreNames) {
}
