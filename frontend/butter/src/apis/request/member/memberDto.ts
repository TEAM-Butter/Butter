interface SignUpRequestDto {
    loginId: string,
    email: string,
    birthDate: string,
    password: string,
    gender: string,
}

interface MemberExtraInfoDto {
    nickname: string;
    profileImage: string;
    avatarType: string;
    genres: string[];
}

export type {
    SignUpRequestDto,
    MemberExtraInfoDto
}