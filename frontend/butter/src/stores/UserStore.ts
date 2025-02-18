import { create } from "zustand";
import { getAccessToken } from "../apis/auth";
import { persist, createJSONStorage } from "zustand/middleware";

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

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLogin: false,
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
        genres
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
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);