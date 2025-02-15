package com.ssafy.butter.domain.member.dto.request;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public record MemberSearchRequestDTO(
        String keyword,
        int page,
        int size
) {
    public Pageable getPageable(){
        return PageRequest.of(page, size);
    }
}
