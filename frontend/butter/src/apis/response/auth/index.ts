interface CrewInfo {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  promotionUrl: string;
  createDate: string;
  followerCnt: number;
}
interface AuthenticatedMemberInfo {
  nickname: string;
  profileImage: string;
  avatarType: string;
  memberType: string;
  genres: string[];
  isExtraInfoRegistered: boolean;
  crew: CrewInfo;
}

interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  authenticatedMemberInfo: AuthenticatedMemberInfo;
}

interface EmailSendCodeResponseDto {
  message: string;
  code: string;
}

interface EmailVerifyCodeResponseDto {
  message: string;
  type: string;
  additionalInfo: string;
}

export type {
  LoginResponseDto,
  EmailSendCodeResponseDto,
  EmailVerifyCodeResponseDto,
};
