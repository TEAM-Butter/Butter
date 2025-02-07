interface AuthInfo {
    id: number;
    email: string;
    gender: string;
    birthDate: string;
}

interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    authInfoDTO: AuthInfo;
}

export type {
    LoginResponseDto,
}