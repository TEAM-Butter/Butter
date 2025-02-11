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
    isExtraInfoRegistered: boolean
  ) => void;
  logout: () => void;
}

// 로그인상태유지 : stores=> UserStore.ts
export const useUserStore = create<UserState>((set) => ({
  isLogin: true,
  nickname: null,
  profileImage: null,
  avatarType: null,
  memberType: "crew",
  isExtraInfoRegistered: true,

  setUser: (
    isLogin,
    nickname,
    profileImage,
    avatarType,
    memberType,
    isExtraInfoRegistered
  ) =>
    set({
      isLogin,
      nickname,
      profileImage,
      avatarType,
      memberType,
      isExtraInfoRegistered,
    }),
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
