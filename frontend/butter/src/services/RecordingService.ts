import { Room, RoomEvent } from "livekit-client";

export class RecordingService {
  private room: Room;
  private baseUrl: string;
  private isRecording: boolean = false; // 녹화 상태 추적용 변수

  constructor(room: Room) {
    this.room = room;
    this.baseUrl =
      import.meta.env.VITE_APPLICATION_SERVER_URL || "http://localhost:6080";
  }

  // isRecordingInProgress 메서드 추가
  isRecordingInProgress(): boolean {
    return this.isRecording;
  }

  async startRecording() {
    if (this.isRecording) {
      throw new Error("Recording is already in progress");
    }

    try {
      console.log("room정보 불러오기", this.room);
      const response = await fetch(`${this.baseUrl}/recordings/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName: this.room.name }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("녹화실패");

        throw new Error(error.errorMessage || "Failed to start recording");
      }
      console.log("녹화성공공");
      this.isRecording = true; // 녹화 시작 시 상태 업데이트
      console.log("response", response);
      return await response.json();
    } catch (error) {
      this.isRecording = false; // 에러 발생 시 상태 초기화
      console.error("Failed to start recording:", error);
      throw error;
    }
  }

  async stopRecording() {
    if (!this.isRecording) {
      throw new Error("No recording in progress");
    }

    try {
      const response = await fetch(`${this.baseUrl}/recordings/stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName: this.room.name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errorMessage || "Failed to stop recording");
      }
      console.log("녹화 중지지");
      this.isRecording = false; // 녹화 중지 시 상태 업데이트
      return await response.json();
    } catch (error) {
      console.error("Failed to stop recording:", error);
      throw error;
    }
  }

  listenToRecordingStatus(callback: (status: string) => void) {
    this.room.on(RoomEvent.RoomMetadataChanged, (metadata: string) => {
      try {
        const parsed = JSON.parse(metadata);
        if (parsed.recordingStatus) {
          callback(parsed.recordingStatus);
          // 메타데이터 변경에 따라 녹화 상태 업데이트
          this.isRecording = parsed.recordingStatus === "STARTED";
        }
      } catch (error) {
        console.error("Failed to parse room metadata:", error);
      }
    });
  }
}
