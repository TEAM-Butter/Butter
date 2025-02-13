import { Room, RoomEvent } from "livekit-client";
import { Recording } from "./types";

export class RecordingService {
  private room: Room;
  private baseUrl: string;
  private isRecording: boolean = false;

  constructor(room: Room) {
    this.room = room;
    // this.baseUrl = baseUrl;
    this.baseUrl =
      import.meta.env.VITE_APPLICATION_SERVER_URL || "http://localhost:6080";
  }

  isRecordingInProgress(): boolean {
    return this.isRecording;
  }
  async startRecording(): Promise<void> {
    const response = await this.httpRequest("POST", "/recordings/start", {
      roomName: this.room.name,
    });
    if (response.error) {
      throw new Error(`Failed to start recording: ${response.error.message}`);
    }
  }

  async stopRecording(): Promise<void> {
    const response = await this.httpRequest("POST", "/recordings/stop", {
      roomName: this.room.name,
    });
    if (response.error) {
      throw new Error(`Failed to stop recording: ${response.error.message}`);
    }
  }

  listenToRecordingStatus(callback: (status: string) => void) {
    this.room.on(RoomEvent.RoomMetadataChanged, (metadata: string) => {
      try {
        const parsed = JSON.parse(metadata);
        if (parsed.recordingStatus) {
          callback(parsed.recordingStatus);
          // 메타데이터 변경에 따라 녹화 상태 업데이트
          // this.isRecording = parsed.recordingStatus === "STARTED";
        }
      } catch (error) {
        console.error("Failed to parse room metadata:", error);
      }
    });
  }

  async deleteRecording(recordingName: string): Promise<void> {
    const response = await this.httpRequest(
      "DELETE",
      `/recordings/${recordingName}`
    );
    if (response.error && response.error.status !== 404) {
      throw new Error(`Failed to delete recording: ${response.error.message}`);
    }
  }

  async getRecordingUrl(recordingName: string): Promise<string> {
    const response = await this.httpRequest(
      "GET",
      `/recordings/${recordingName}/url`
    );
    if (response.error) {
      throw new Error(`Failed to get recording URL: ${response.error.message}`);
    }
    console.log("녹화본 이름", response.data?.recordingName);
    console.log("녹화본 Url", response.data?.recordingUrl);
    return response.data?.recordingUrl;
  }

  async listRecordings(
    roomName?: string,
    roomId?: string
  ): Promise<Recording[]> {
    const url =
      "/recordings" +
      (roomName
        ? `?roomName=${roomName}` + (roomId ? `&roomId=${roomId}` : "")
        : "");
    
    console.log(url)

    const response = await this.httpRequest("GET", url);
    if (response.error) {
      throw new Error(`Failed to list recordings: ${response.error.message}`);
    }
    return response.data.recordings;
  }

  private async httpRequest(method: string, url: string, body?: any) {
    try {
      const response = await fetch(this.baseUrl + url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(body) : undefined,
      });

      const responseBody = await response.json();

      if (!response.ok) {
        return {
          error: {
            status: response.status,
            message: responseBody.errorMessage,
          },
          data: undefined,
        };
      }

      return {
        error: undefined,
        data: responseBody,
      };
    } catch (error) {
      return {
        error: {
          status: 0,
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
        data: undefined,
      };
    }
  }
}
