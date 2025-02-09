interface LoginRequestDto {
    loginId: string,
    password: string,
}

interface EmailExistRequestDto {
    email: string,
    type: string,
}

export type {
    LoginRequestDto,
    EmailExistRequestDto
}