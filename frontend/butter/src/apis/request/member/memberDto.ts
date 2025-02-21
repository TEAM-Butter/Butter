interface SignUpRequestDto {
    loginId: string,
    email: string,
    birthDate: string,
    password: string,
    gender: string,
}

interface MemberExtraInfoRequestDto {
    nickname: string;
    profileImage: File | null;
    avatarType: string;
    genres: string[];
}

interface CheckLoginIdRequestDto {
    loginId: string
}

interface CheckNicknameRequestDto {
    nickname: string
}

interface PasswordUpdateRequestDTO {
    currentPassword: string;
    newPassword: string;
}

export type {
    SignUpRequestDto,
    MemberExtraInfoRequestDto,
    CheckLoginIdRequestDto,
    PasswordUpdateRequestDTO,
    CheckNicknameRequestDto,
}