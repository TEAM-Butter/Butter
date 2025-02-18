interface roomMotionsType {
  heart: number;
  like: number;
}

interface MemberType {
  nickname: string;
  avatarType: string;
}
export interface SocketContent {
  status: string;
  participant: string;
  role: string;
  label: string;
  roomMotions: roomMotionsType;
  members: MemberType[];
}
