import { create } from "zustand";
import { getAccessToken } from "../apis/auth";

interface UserState {
  isLogin: boolean;
  nickname: string | null;
  profileImage: string | null;
  avatarType: string | null;
  memberType: string | null;
  isExtraInfoRegistered: boolean;
  genres: string[];

  setUser: (
    isLogin: boolean,
    nickname: string,
    profileImage: string,
    avatarType: string,
    memberType: string,
    isExtraInfoRegistered: boolean,
    genres: string[],
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
  genres: [],

  setUser: (
    isLogin,
    nickname,
    profileImage,
    avatarType,
    memberType,
    isExtraInfoRegistered,
    genres,
  ) =>
    set({
      isLogin,
      nickname,
      profileImage,
      avatarType,
      memberType,
      isExtraInfoRegistered,
      genres,
    }),
  logout: () =>
    set({
      isLogin: false,
      nickname: null,
      profileImage: null,
      avatarType: null,
      memberType: null,
      isExtraInfoRegistered: true,
      genres: [],
    }),
}));
