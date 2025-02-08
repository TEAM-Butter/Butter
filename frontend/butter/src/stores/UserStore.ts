import { create } from "zustand";

interface UserState {
  isLogin: boolean;
  nickname: string | null;
  profileImage: string | null;
  avatarType: string | null;
  memberType: string | null;
  setUser: (
    isLogin: boolean,
    nickname: string,
    profileImage: string,
    avatarType: string,
    memberType: string
  ) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLogin: true,
  nickname: null,
  profileImage: null,
  avatarType: null,
  memberType: "crew",

  setUser: (isLogin, nickname, profileImage, avatarType, memberType) =>
    set({ isLogin, nickname, profileImage, avatarType, memberType }),
  logout: () =>
    set({
      isLogin: false,
      nickname: null,
      profileImage: null,
      avatarType: null,
      memberType: null,
    }),
}));
