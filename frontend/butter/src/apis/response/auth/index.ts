interface AuthenticatedMemberInfo {
    nickname: string;
    profileImage: string;
    avatarType: string;
    memberType: string;
    genres: string[];
    isExtraInfoRegistered: boolean;
}

interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    authenticatedMemberInfo: AuthenticatedMemberInfo;
}

interface EmailExistResponseDto {
    email: string,
    type: string,
}

export type {
    LoginResponseDto,
    EmailExistResponseDto,
}