import { create } from "zustand";
import { getAccessToken } from "../apis/auth";

interface UserState {
    isLogin: boolean,
    nickname: string | null;
    profileImage: string | null;
    avatarType: string | null;
    memberType: string | null;
    setUser: (isLogin: boolean, nickname: string, profileImage: string, avatarType: string, memberType: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    isLogin: !!getAccessToken(),
    nickname: null,
    profileImage: null,
    avatarType: null,
    memberType: null,

    setUser: (isLogin, nickname, profileImage, avatarType, memberType) => set({ isLogin, nickname, profileImage, avatarType, memberType }),
    logout: () => set({
        isLogin: false,
        nickname: null,
        profileImage: null,
        avatarType: null,
        memberType: null,
    })
}))