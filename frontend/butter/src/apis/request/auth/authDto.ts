interface LoginRequestDto {
    loginId: string;
    password: string;
}

interface EmailExistSendDto {
    email: string;
    type: string;
}

interface EmailVerifyCodeRequestDto {
    email: string;
    verifyCode: string;
    type: string;
}

export type {
    LoginRequestDto,
    EmailExistSendDto,
    EmailVerifyCodeRequestDto,
}