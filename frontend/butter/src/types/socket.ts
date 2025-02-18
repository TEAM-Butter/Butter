interface roomMotionsType {
  heart: number;
  like: number;
}

export interface MemberType {
  nickname: string;
  avatarType: string;
  left: number;
  isEmoting: boolean;
  currentEmotion: string;
}
export interface SocketContent {
  status: string;
  participant: string;
  role: string;
  label: string;
  roomMotions: roomMotionsType;
  members: MemberType[];
}
