package com.ssafy.butter.infrastructure.email.dto.response;


public record VerifyCodeResponseDTO(
        String message,
        String type,
        String additionalInfo //아이디 찾기는 memberId, 비밀 번호 찾기는 임시 비밀 번호
) {
}
