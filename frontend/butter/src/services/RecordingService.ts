import { Room, RoomEvent } from "livekit-client";

export class RecordingService {
  private room: Room;
  private baseUrl: string;
  private isRecording: boolean = false;

  constructor(room: Room) {
    this.room = room;
    this.baseUrl =
      import.meta.env.VITE_APPLICATION_SERVER_URL || "http://localhost:6080";
  }

  isRecordingInProgress(): boolean {
    return this.isRecording;
  }

  async startRecording() {
    if (this.isRecording) {
      throw new Error("Recording is already in progress");
    }

    try {
      console.log("room 정보 불러오기", this.room);
      const response = await fetch(`${this.baseUrl}/recordings/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName: this.room.name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("녹화 실패");
        throw new Error(errorData.errorMessage || "Failed to start recording");
      }

      console.log("녹화 성공");
      this.isRecording = true;
      console.log("response", response);
      return await response.json();
    } catch (error) {
      this.isRecording = false;
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
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "Failed to stop recording");
      }

      console.log("녹화 중지");
      this.isRecording = false;
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
          this.isRecording = parsed.recordingStatus === "STARTED";
        }
      } catch (error) {
        console.error("Failed to parse room metadata:", error);
      }
    });
  }

  async deleteRecording(recordingName: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/recordings/${recordingName}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomName: this.room.name }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || "Failed to delete recording");
      }
    } catch (error) {
      console.error("Failed to delete recording:", error);
      throw error;
    }
  }

  async getRecordingUrl(recordingName: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/recordings/${recordingName}/url`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errorMessage || "Failed to get recording URL"
        );
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Failed to get recording URL:", error);
      throw error;
    }
  }
}
