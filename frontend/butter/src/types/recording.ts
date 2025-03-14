export interface RecordingInfo {
  id: string;
  name: string;
  roomName: string;
  roomId: string;
  startedAt: number;
  duration: number;
  size: number;
}

export type RecordingStatus =
  | "STARTING"
  | "STARTED"
  | "STOPPING"
  | "STOPPED"
  | "FAILED";

export interface Recording {
  name: string;
  duration?: number;
  size?: number;
  startedAt: string;
}
