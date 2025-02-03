package com.ssafy.butter.infrastructure.email.constants;

public class EmailConstants {
    public static final String MAIL_SUBJECT = "[Butter] 이메일 인증 코드를 발송해 드립니다.";
    public static final int RANDOM_CODE_LENGTH = 6;
    public static final int ALPHABET_PROBABILITY = 24;
    public static final int TOTAL_PROBABILITY = 36;
    public static final int SIGNUP_EXPIRE_MIN = 300000;
    public static final int ELSE_EXPIRE_MIN = 600000;

    private EmailConstants() {}
}