interface roomMotionsType {
  heart: number;
  like: number;
}

export interface SocketContent {
  status: string;
  participant: string;
  role: string;
  label: string;
  roomMotions: roomMotionsType;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}
