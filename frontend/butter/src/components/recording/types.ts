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
  recordingUrl: string;
}
