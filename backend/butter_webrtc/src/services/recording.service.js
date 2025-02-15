import {
  EgressClient,
  EgressStatus,
  EncodedFileOutput,
  EncodedFileType,
} from "livekit-server-sdk";
import {
  LIVEKIT_URL,
  LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET,
  RECORDINGS_PATH,
  CLIPS_TMP_PATH,
  CLIPS_PATH,
  RECORDINGS_METADATA_PATH,
  RECORDING_FILE_PORTION_SIZE,
} from "../config.js";
import { S3Service } from "./s3.service.js";
import fs from "fs";
import os from "os";
import path from "path";
import { exec } from "node:child_process";
import { Stream, Readable } from 'stream';
// import {insertClip} from "./mysql.service.js"

const s3Service = new S3Service();

export class RecordingService {
  static instance;

  constructor() {
    if (RecordingService.instance) {
      return RecordingService.instance;
    }

    this.egressClient = new EgressClient(
      LIVEKIT_URL,
      LIVEKIT_API_KEY,
      LIVEKIT_API_SECRET
    );
    RecordingService.instance = this;
    return this;
  }

  async startRecording(roomName) {
    // Use the EncodedFileOutput to save the recording to an MP4 file
    const fileOutput = new EncodedFileOutput({
      fileType: EncodedFileType.MP4,
      filepath: `${RECORDINGS_PATH}{room_name}-{room_id}-{time}`,
      disableManifest: true,
    });
    // Start a RoomCompositeEgress to record all participants in the room
    const egressInfo = await this.egressClient.startRoomCompositeEgress(
      roomName,
      { file: fileOutput }
    );
    return this.convertToRecordingInfo(egressInfo);
  }

  async stopRecording(recordingId) {
    // Stop the egress to finish the recording
    const egressInfo = await this.egressClient.stopEgress(recordingId);
    await this.saveRecordingMetadata(egressInfo);
    return this.convertToRecordingInfo(egressInfo);
  }

  async listRecordings(roomName, roomId) {
    const keyStart =
      RECORDINGS_PATH +
      RECORDINGS_METADATA_PATH +
      (roomName ? `${roomName}-` + (roomId ? roomId : "") : "");
    const keyEnd = ".json";
    const regex = new RegExp(`^${keyStart}.*${keyEnd}$`);

    // List all egress metadata files in the recordings path that match the regex
    const metadataKeys = await s3Service.listObjects(
      RECORDINGS_PATH + RECORDINGS_METADATA_PATH,
      regex
    );

    const recordings = await Promise.all(
      metadataKeys.map((metadataKey) => s3Service.getObjectAsJson(metadataKey))
    );
    
    return this.filterAndSortRecordings(recordings, roomName, roomId);
  }

  async listClips(crewId) {
    const keyStart =
      CLIPS_PATH + "clip-" + (crewId ? `${crewId}` : "");
    const keyEnd = ".mp4";
    const regex = new RegExp(`^${keyStart}.*${keyEnd}$`);

    // List all egress metadata files in the recordings path that match the regex
    const clipKeys = await s3Service.listObjects(
      CLIPS_PATH,
      regex
    );

    const clips = clipKeys.map((clipKey) => {
      // Extract the timestamp from the clip name (assuming the name contains a timestamp)
      const timestamp = clipKey.split('-').pop().replace('.mp4', '');
      const clipName = clipKey.split('/').pop();
      return { clipKey, clipName, timestamp: parseInt(timestamp) };
    });

    // Sort clips by timestamp in descending order
    sortedClips = clips.sort((a, b) => b.timestamp - a.timestamp);
    
    return sortedClips.map((clip) => clip.clipName);
  }

  filterAndSortRecordings(recordings, roomName, roomId) {
    let filteredRecordings = recordings;

    if (roomName || roomId) {
      filteredRecordings = recordings.filter((recording) => {
        return (
          (!roomName || recording.roomName === roomName) &&
          (!roomId || recording.roomId === roomId)
        );
      });
    }

    return filteredRecordings.sort((a, b) => b.startedAt - a.startedAt);
  }

  filterAndSortRecordings(recordings, roomName, roomId) {
    let filteredRecordings = recordings;

    if (roomName || roomId) {
      filteredRecordings = recordings.filter((recording) => {
        return (
          (!roomName || recording.roomName === roomName) &&
          (!roomId || recording.roomId === roomId)
        );
      });
    }

    return filteredRecordings.sort((a, b) => b.startedAt - a.startedAt);
  }

  async getActiveRecordingByRoom(roomName) {
    try {
      // List all active egresses for the room
      const egresses = await this.egressClient.listEgress({
        roomName,
        active: true,
      });
      return egresses.length > 0 ? egresses[0].egressId : null;
    } catch (error) {
      console.error("Error listing egresses.", error);
      return null;
    }
  }

  async getRecordingMetadata(recordingName) {
    const key = this.getMetadataKey(recordingName);
    return s3Service.getObjectAsJson(key);
  }

  async getRecordingStream(recordingName, range) {
    const key = this.getRecordingKey(recordingName);
    const size = await s3Service.getObjectSize(key);

    // Get the requested range
    const parts = range?.replace(/bytes=/, "").split("-");
    const start = range ? parseInt(parts[0], 10) : 0;
    const endRange = parts[1]
      ? parseInt(parts[1], 10)
      : start + RECORDING_FILE_PORTION_SIZE;
    const end = Math.min(endRange, size - 1);

    const stream = await s3Service.getObject(key, { start, end });
    return { stream, size, start, end };
  }

  async getRecordingUrl(recordingName) {
    const key = this.getRecordingKey(recordingName);
    return s3Service.getObjectUrl(key);
  }

  async getClipUrl(clipName) {
    const key = this.getClipKey(clipName);
    return s3Service.getObjectUrl(key);
  }

  async getClipTmpUrl(clipTmpName) {
    const key = this.getClipTmpKey(clipTmpName);
    return s3Service.getObjectUrl(key);
  }

  async getCrewIdToClipName(clipName) {
    const crewName = clipName.split('-')[1];
    return crewName;
  }

  async existsRecording(recordingName) {
    const key = this.getRecordingKey(recordingName);
    return s3Service.exists(key);
  }

  async existsClipTmp(clipTmpName) {
    const key = this.getClipTmpKey(clipTmpName);
    return s3Service.exists(key);
  }

  async existsClip(clipName) {
    const key = this.getClipKey(clipName);
    return s3Service.exists(key);
  }

  async deleteRecording(recordingName) {
    const recordingKey = this.getRecordingKey(recordingName);
    const metadataKey = this.getMetadataKey(recordingName);
    // Delete the recording file and metadata file from S3
    await Promise.all([
      s3Service.deleteObject(recordingKey),
      s3Service.deleteObject(metadataKey),
    ]);
  }

  async saveRecordingMetadata(egressInfo) {
    const recordingInfo = this.convertToRecordingInfo(egressInfo);
    console.log("Saving metadata:", recordingInfo);
    const key = this.getMetadataKey(recordingInfo.name);
    await s3Service.uploadObject(key, recordingInfo);
  }

  convertToRecordingInfo(egressInfo) {
    if (!egressInfo.fileResults || egressInfo.fileResults.length === 0) {
        console.error("No file results found for egress:", egressInfo);
        return null;
    }

    const file = egressInfo.fileResults[0];
    return {
      id: egressInfo.egressId,
      name: file.filename.split("/").pop(),
      roomName: egressInfo.roomName,
      roomId: egressInfo.roomId,
      startedAt: Number(egressInfo.startedAt) / 1_000_000,
      duration: Number(file.duration) / 1_000_000_000,
      size: Number(file.size),
    };
  }

  getRecordingStatus(egressStatus) {
    switch (egressStatus) {
      case EgressStatus.EGRESS_STARTING:
        return "STARTING";
      case EgressStatus.EGRESS_ACTIVE:
        return "STARTED";
      case EgressStatus.EGRESS_ENDING:
        return "STOPPING";
      case EgressStatus.EGRESS_COMPLETE:
        return "STOPPED";
      default:
        return "FAILED";
    }
  }

  getRecordingKey(recordingName) {
    return RECORDINGS_PATH + recordingName;
  }

  getMetadataKey(recordingName) {
    return (
      RECORDINGS_PATH +
      RECORDINGS_METADATA_PATH +
      recordingName.replace(".mp4", ".json")
    );
  }

  getThumbnailKey(recordingName) {
    return RECORDINGS_PATH + recordingName.replace(".mp4", ".jpg");
  }

  getClipTmpKey(clippedRecordingName) {
    return CLIPS_PATH + clippedRecordingName;
  }

  getClipKey(clippedRecordingName) {
    return CLIPS_PATH + clippedRecordingName;
  }

  getClipThumbnailKey(clippedRecordingName) {
    return CLIPS_PATH + clippedRecordingName.replace(".mp4", ".jpg");
  }

  async saveThumbnail(recordingName, imageBuffer) {
    const thumbnailKey = this.getThumbnailKey(recordingName);

    try {
      // 이미지 파일을 임시 파일로 저장
      const tempThumbnailPath = `/tmp/${recordingName.replace(".mp4", ".jpg")}`;
      fs.writeFileSync(tempThumbnailPath, imageBuffer);

      // S3에 업로드
      await s3Service.uploadObject(
        thumbnailKey,
        fs.createReadStream(tempThumbnailPath)
      );

      // 임시 파일 삭제
      fs.unlinkSync(tempThumbnailPath);

      return { success: true, thumbnailKey };
    } catch (error) {
      console.error("Error saving thumbnail:", error);
      return { success: false, error: error.message };
    }
  }

  // 썸네일 URL 가져오기
  async getThumbnailUrl(recordingName) {
    const key = this.getThumbnailKey(recordingName);

    // 썸네일 존재 여부 확인
    const exists = await s3Service.exists(key);
    if (!exists) {
      return null;
    }

    return s3Service.getObjectUrl(key);
  }

  async clipRecording(recordingName, startTime, endTime, time) {
    console.log("Time "+startTime+", "+endTime);
    const result = recordingName.split('-')[0];
    const clipName = `clip-${result}-${time}.mp4`;
    const inputKey = this.getRecordingKey(recordingName);
    const outputKey = this.getClipTmpKey(clipName);

    const tempDir = os.tmpdir();
    console.log('os.tmpdir(): ', os.tmpdir());
    const tempInputPath = path.join(tempDir, `/${recordingName}`);
    const tempOutputPath = path.join(tempDir, `/${clipName}`);

    const duration = endTime - startTime;

    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // S3에서 원본 영상 다운로드
      const inputStream = await s3Service.getObject(inputKey);
      const writeStream = fs.createWriteStream(tempInputPath);
      inputStream.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      // ffmpeg를 이용해 영상 자르기
      await new Promise((resolve, reject) => {
        exec(
          `ffmpeg -y -i "${tempInputPath}" -ss ${startTime} -t ${duration} -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k "${tempOutputPath}"`,
          (error, stdout, stderr) => {
            if (error) {
              console.error("FFmpeg error:", error, stderr);
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });

      // 잘린 영상 S3에 업로드
      await s3Service.uploadVideo(outputKey, fs.createReadStream(tempOutputPath));

      // 로컬 파일 삭제
      fs.unlinkSync(tempInputPath);
      fs.unlinkSync(tempOutputPath);

      return { success: true, clipUrl: await this.getClipTmpUrl(clipName), clipName: clipName};
    } catch (error) {
      console.error("Error clipping recording:", error);
      return { success: false, error: error.message };
    }
  }

  async saveClipRecording(title, clipName) {
    try {
      //Mysql에 저장

      // 성공적으로 완료되면 URL 반환
      return { success: true, clipName: clipName };
    } catch (error) {
      console.error("Error saving clip:", error);
      return { success: false, error: error.message };
    }
  }
}
