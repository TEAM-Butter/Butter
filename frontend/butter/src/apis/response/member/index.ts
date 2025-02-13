interface SignUpResponseDto {
    loginId: string,
    email: string,
    birthDate: string,
    gender: string,
}

interface MemberDetailResponseDto {
    loginId: string,
    email: string,
    birthdate: string,
    gender: string,
    profileImage: string,
    nickname: string,
    genres: string[],
    avatarType: string,
    isExtraInfoRegistered: boolean
}

interface CheckLoginIdResponseDto {
    exists: boolean,
    message: string,
}

interface MemberExtraInfoResponseDto {
    nickname: string;
    profileImage: string;
    avatarType: string;
    genres: string[];
}


export type {
    SignUpResponseDto,
    MemberDetailResponseDto,
    CheckLoginIdResponseDto,
    MemberExtraInfoResponseDto,
}
