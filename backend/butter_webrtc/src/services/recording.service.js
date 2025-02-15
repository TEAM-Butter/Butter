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
  CLIPS_PATH,
  RECORDINGS_METADATA_PATH,
  RECORDING_FILE_PORTION_SIZE,
} from "../config.js";
import { S3Service } from "./s3.service.js";
import fs from "fs";
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
    return this.convertToRecordingInfo(egressInfo);
  }

  async listRecordings(roomName, roomId) {
    const keyStart =
      RECORDINGS_PATH +
      // RECORDINGS_METADATA_PATH +
      (roomName ? `${roomName}-` + (roomId ? roomId : "") : "");
    const keyEnd = ".mp4";
    const regex = new RegExp(`^${keyStart}.*${keyEnd}$`);

    // List all egress metadata files in the recordings path that match the regex
    const recordingKeys = await s3Service.listObjects(
      // RECORDINGS_PATH + RECORDINGS_METADATA_PATH,
      RECORDINGS_PATH,
      regex
    );
    // const recordings = await Promise.all(
    //   recordingKeys.map((recordingKey) => s3Service.getObjectAsJson(recordingKey))
    // );

    // const recordings = await Promise.all(
    //   metadataKeys.map(async (metadataKey) => {
    //     const metadata = await s3Service.getObjectAsJson(metadataKey);
    //     const recordingExists = await this.existsRecording(metadata.name);
    //     return recordingExists ? metadata : null;
    //   })
    // );

    // const validRecordings = recordings.filter(
    //   (recording) => recording !== null
    // );

    console.log(recordingKeys)
    // return this.filterAndSortRecordings(validRecordings, roomName, roomId);
    return this.filterAndSortRecordings(recordingKeys, roomName, roomId);
  }

  extractRoomInfo = (filename) => {
    const regex = /recordings\/(.+)-(\w+)-\d{4}-\d{2}-\d{2}T\d{6}\.mp4/;
    const match = filename.match(regex);
    
    if (match) {
        return { roomName: match[1], roomId: match[2] };
    } else {
        return null;
    }
  };

  filterAndSortRecordings(recordings, roomName, roomId) {
    let filteredRecordings = recordings;

    if (roomName || roomId) {
      filteredRecordings = recordings.extractRoomInfo((recording) => {
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

  async existsRecording(recordingName) {
    const key = this.getRecordingKey(recordingName);
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
    const key = this.getMetadataKey(recordingInfo.name);
    await s3Service.uploadObject(key, recordingInfo);
  }

  convertToRecordingInfo(egressInfo) {
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

  async clipRecording(recordingName, startTime, endTime, crewId, title) {
    const inputKey = this.getRecordingKey(recordingName);
    const clippedRecordingName = `clipped-${startTime}-${endTime}-${recordingName}.mp4`;
    const outputKey = this.getClipKey(clippedRecordingName);
    const thumbnailKey = this.getClipThumbnailKey(clippedRecordingName);

    const tempInputPath = `/tmp/${recordingName}`;
    const tempOutputPath = `/tmp/${clippedRecordingName}.mp4`;
    const thumbnailPath = `/tmp/thumbnail-${clippedRecordingName}.jpg`;

    try {
      // S3에서 원본 영상 다운로드
      await s3Service.downloadObject(inputKey, tempInputPath);

      // FFmpeg을 이용해 영상 자르기
      const command = `ffmpeg -i "${tempInputPath}" -ss ${startTime} -to ${endTime} -c copy "${tempOutputPath}"`;
      await execPromise(command);

      // 썸네일 추출 (10번째 프레임)
      const thumbnailCommand = `ffmpeg -i "${tempOutputPath}" -vf "select='eq(n\\,10)'" -vsync vfr "${thumbnailPath}"`;
      await execPromise(thumbnailCommand);

      // 잘린 영상 S3에 업로드
      await s3Service.uploadObject(
        outputKey,
        fs.createReadStream(tempOutputPath)
      );
      await s3Service.uploadObject(
        thumbnailKey,
        fs.createReadStream(thumbnailPath)
      );

      // 임시 파일 삭제
      fs.unlinkSync(tempInputPath);
      fs.unlinkSync(tempOutputPath);
      fs.unlinkSync(thumbnailPath);

      // await insertClip(crewId, title, clippedRecordingName);

      return { success: true, clippedRecordingName };
    } catch (error) {
      console.error("Error clipping recording:", error);
      return { success: false, error: error.message };
    }
  }
}
