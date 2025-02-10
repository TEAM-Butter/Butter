interface SignUpRequestDto {
    loginId: string,
    email: string,
    birthDate: string,
    password: string,
    gender: string,
}

interface CheckLoginIdRequestDto {
    loginId: string
}

export type {
    SignUpRequestDto,
    CheckLoginIdRequestDto,
}