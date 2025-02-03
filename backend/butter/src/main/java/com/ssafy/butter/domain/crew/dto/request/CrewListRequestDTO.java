package com.ssafy.butter.domain.crew.dto.request;

public record CrewListRequestDTO(Long crewId, String keyword, Integer pageSize) {
}
