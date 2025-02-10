interface SignUpResponseDto {
    loginId: string,
    email: string,
    birthDate: string,
    gender: string,
}

interface MemberDetailResponseDto {
    loginId: String,
    email: String,
    birthdate: String,
    gender: String,
    profileImageUrl: String,
    nickname: String,
    genres: String[],
    avatarType: String,
    isExtraInfoRegistered: boolean
}

export type {
    SignUpResponseDto,
    MemberDetailResponseDto,
}
