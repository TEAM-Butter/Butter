package com.ssafy.butter.infrastructure.email.constants;

public class EmailErrorMessages {

    public static final String REDIS_CONNECTION_ERROR = "ERR : Redis 서버에 연결할 수 없습니다. 나중에 다시 시도하세요.";
    public static final String REDIS_SAVE_ERROR = "ERR : Redis 데이터 저장 중 오류 발생: ";
    public static final String REDIS_READ_ERROR = "ERR : Redis 데이터 조회 중 오류 발생: ";

    public static final String EMAIL_SEND_ERROR = "ERR : 이메일 전송에 실패했습니다. 관리자에게 문의하세요.";

    public static final String INVALID_VERIFICATION_CODE = "ERR : 유효하지 않은 인증 코드입니다.";
    public static final String MISMATCH_VERIFICATION_CODE = "ERR : 인증 코드가 일치하지 않습니다.";

    private EmailErrorMessages() {}
}
