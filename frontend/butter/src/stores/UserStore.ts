import { create } from "zustand";

interface UserState {
    nickname: string | null;
    profileImage: string | null;
    avatarType: string | null;
    memberType: string | null;
    setUser: (nickname: string, profileImage: string, avatarType: string, memberType: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    nickname: null,
    profileImage: null,
    avatarType: null,
    memberType: null,

    setUser: (nickname, profileImage, avatarType, memberType) => set({ nickname, profileImage, avatarType, memberType }),
    logout: () => set({
        nickname: null,
        profileImage: null,
        avatarType: null,
        memberType: null,
    })
}))