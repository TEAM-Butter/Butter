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
    genres: string[]
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

interface CrewState {
  id: number | null;
  name: string | null;
  description: string | null;
  imageUrl: string | null;
  promotionUrl: string | null;
  createDate: string | null; // ISO 날짜 문자열
  followerCnt: number | null;

  setCrew: (
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    promotionUrl: string,
    createDate: string, // ISO 날짜 문자열
    followerCnt: number
  ) => void;

  logout: () => void;
}

export const useCrewStore = create<CrewState>()(
  persist(
    (set) => ({
      id: null,
      name: null,
      description: null,
      imageUrl: null,
      promotionUrl: null,
      createDate: null,
      followerCnt: null,

      setCrew: (
        id,
        name,
        description,
        imageUrl,
        promotionUrl,
        createDate, // ISO 날짜 문자열
        followerCnt
      ) =>
        set({
          id,
          name,
          description,
          imageUrl,
          promotionUrl,
          createDate, // ISO 날짜 문자열
          followerCnt,
        }),

      logout: () =>
        set({
          id: null,
          name: null,
          description: null,
          imageUrl: null,
          promotionUrl: null,
          createDate: null,
          followerCnt: null,
        }),
    }),
    {
      name: "crew-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
