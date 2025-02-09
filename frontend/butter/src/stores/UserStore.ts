import { create } from "zustand";
import { getAccessToken } from "../apis/auth";

interface UserState {
    isLogin: boolean;
    nickname: string | null;
    profileImage: string | null;
    avatarType: string | null;
    memberType: string | null;
    isExtraInfoRegistered: boolean;

    setUser: (
        isLogin: boolean,
        nickname: string,
        profileImage: string,
        avatarType: string,
        memberType: string,
        isExtraInfoRegistered: boolean,
    ) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    isLogin: !!getAccessToken(),
    nickname: null,
    profileImage: null,
    avatarType: null,
    memberType: null,
    isExtraInfoRegistered: true,

    setUser: (isLogin, nickname, profileImage, avatarType, memberType, isExtraInfoRegistered) =>
        set({ isLogin, nickname, profileImage, avatarType, memberType, isExtraInfoRegistered }),
    logout: () =>
        set({
            isLogin: false,
            nickname: null,
            profileImage: null,
            avatarType: null,
            memberType: null,
            isExtraInfoRegistered: true,
        }),
}));
