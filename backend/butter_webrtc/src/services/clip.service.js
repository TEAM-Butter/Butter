import {
    RECORDINGS_PATH,
    CLIPS_TMP_PATH,
    CLIPS_PATH,
    RECORDINGS_METADATA_PATH,
    RECORDING_FILE_PORTION_SIZE,
} from "../config.js";
import { S3Service } from "./s3.service.js";
import { MySQLService } from "./mysql.service.js";
import { RecordingService } from "./recording.service.js";
import fs from "fs";
import os from "os";
import path from "path";
import { exec } from "node:child_process";

const s3Service = new S3Service();
const dbService = new MySQLService();
const recoredingService = new RecordingService();

export class ClipService {
    static instance;

    constructor() {
        if (ClipService.instance) {
            return ClipService.instance;
        }

        ClipService.instance = this;
        return this;
    }

    async getClipUrl(clipName) {
        const key = this.getClipKey(clipName);
        return s3Service.getObjectUrl(key);
    }

    async getClipThumbnailUrl(clipThumbnailName) {
        const key = this.getClipThumbnailKey(clipThumbnailName);
        return s3Service.getObjectUrl(key);
    }

    async existsClipTmp(clipTmpName) {
        const key = this.getClipTmpKey(clipTmpName);
        return s3Service.exists(key);
    }

    async existsClip(clipName) {
        const key = this.getClipKey(clipName);
        return s3Service.exists(key);
    }

    getCrewIdToClipName(clipName) {
        const crewName = clipName.split('-')[1];
        return crewName;
    }

    getClipTmpKey(clippedRecordingName) {
        return CLIPS_PATH + clippedRecordingName;
    }

    getClipKey(clippedRecordingName) {
        return CLIPS_PATH + clippedRecordingName;
    }

    getClipThumbnailKey(clippedThumbnailName) {
        return CLIPS_PATH + clippedThumbnailName;
    }

    async clipRecording(recordingName, startTime, endTime, time) {
        console.log("Time " + startTime + ", " + endTime);
        const result = recordingName.split('-')[0];
        const clipName = `clip-${result}-${time}.mp4`;
        const inputKey = recoredingService.getRecordingKey(recordingName);
        const outputKey = this.getClipTmpKey(clipName);

        const tempDir = os.tmpdir();
        console.log('os.tmpdir(): ', os.tmpdir());
        const tempInputPath = path.join(tempDir, `/${recordingName}`);
        const tempOutputPath = path.join(tempDir, `/${clipName}`);
        const tempThumbnailPath = path.join(tempDir, `/${recordingName.replace('.mp4', '.jpg')}`);


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

            // 첫 번째 프레임으로 썸네일 생성
            await new Promise((resolve, reject) => {
                exec(
                    `ffmpeg -i "${tempOutputPath}" -frames:v 1 -q:v 3 "${tempThumbnailPath}"`,
                    (error, stdout, stderr) => {
                        if (error) {
                            console.error("FFmpeg thumbnail error:", error, stderr);
                            reject(error);
                        } else {
                            resolve();
                        }
                    }
                );
            });

            await this.saveClipThumbnail(recordingName, tempThumbnailPath);

            // 잘린 영상 S3에 업로드
            await s3Service.uploadVideo(outputKey, fs.createReadStream(tempOutputPath));

            // 로컬 파일 삭제
            fs.unlinkSync(tempInputPath);
            fs.unlinkSync(tempOutputPath);
            fs.unlinkSync(tempThumbnailPath);

            return { success: true, clipUrl: await this.getClipUrl(clipName), clipName: clipName };
        } catch (error) {
            console.error("Error clipping recording:", error);
            return { success: false, error: error.message };
        }
    }

    async saveClipRecording(title, clipName) {
        try {
            // INSERT 쿼리 실행: crewId, title, videoName (clipName으로 저장)
            const crewId = this.getCrewIdToClipName(clipName);
            const sql = "INSERT INTO clip (crew_id, title, video_name) VALUES (?, ?, ?)";
            await dbService.query(sql, [crewId, title, clipName]);

            // 성공적으로 완료되면 clipName 반환
            return { success: true, clipName: clipName };
        } catch (error) {
            console.error("Error saving clip:", error);
            return { success: false, error: error.message };
        }
    }

    async saveClipThumbnail(recordingName, tempThumbnailPath) {
        const thumbnailName = recordingName.replace(".mp4", ".jpg")
        const thumbnailKey = this.getClipThumbnailKey(thumbnailName);

        try {
            const imageBuffer = fs.readFileSync(tempThumbnailPath);

            // S3에 업로드
            await s3Service.uploadImage(
                thumbnailKey,
                imageBuffer
            );

            return { success: true, thumbnailKey };
        } catch (error) {
            console.error("Error saving thumbnail:", error);
            return { success: false, error: error.message };
        }
    }

    async deleteClip(clipName) {
        const clipKey = this.getClipKey(clipName);
        const thumbnailKey = this.getClipThumbnailKey(clipName.replace('.mp4', '.jpg'));
        // Delete the recording file and metadata file from S3
        await Promise.all([
            s3Service.deleteObject(clipKey),
            s3Service.deleteObject(thumbnailKey),
        ]);
    }

    async listClips(crewId) {
        try {
            // crewId에 해당하는 clip 데이터를 조회하는 SQL 쿼리 실행
            const sql = (crewId) ? "SELECT * FROM clip WHERE crew_id = ?" : "SELECT * FROM clip";
            const rows = await this.query(sql, [crewId]);

            const clipNames = rows.map(row => row.clipName);
            const clips = clipNames.map((clipName) => {
                const timestamp = clipName.split('-').pop().replace('.mp4', '');
                const clipKey = this.getClipKey(clipName);
                const thumbnailUrl = this.getClipThumbnailUrl(clipName.replace('.mp4', '.jpg'));

                return { clipKey, clipName, timestamp: parseInt(timestamp), thumbnailUrl }
            })

            // Sort clips by timestamp in descending order
            sortedClips = clips.sort((a, b) => b.timestamp - a.timestamp);

            return sortedClips.map((clip) => clip.clipName);
        } catch (error) {
            console.error("Error retrieving clip list:", error);
            return { success: false, error: error.message };
        }

    }

}