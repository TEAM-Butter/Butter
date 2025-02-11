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

interface CheckLoginIdResponseDto {
    exists: boolean,
    message: string,
}



export type {
    SignUpResponseDto,
    MemberDetailResponseDto,
    CheckLoginIdResponseDto,
}
