interface SignUpRequestDto {
    loginId: string,
    email: string,
    birthDate: string,
    password: string,
    gender: string,
}

interface MemberExtraInfoDto {
    nickname: string;
    profileImage: File | null;
    avatarType: string;
    genres: string[];
}

export type {
    SignUpRequestDto,
    MemberExtraInfoDto
}