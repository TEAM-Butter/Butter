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

export type {
    LoginResponseDto,
}