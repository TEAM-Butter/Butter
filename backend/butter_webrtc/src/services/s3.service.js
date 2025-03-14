import {
    S3Client,
    GetObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
    HeadObjectCommand,
    PutObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_REGION, S3_ACCESS_KEY, S3_BUCKET, S3_ENDPOINT, S3_SECRET_KEY } from "../config.js";

export class S3Service {
    static instance;

    constructor() {
        if (S3Service.instance) {
            return S3Service.instance;
        }

        this.s3Client = new S3Client({
            endpoint: S3_ENDPOINT,
            credentials: {
                accessKeyId: S3_ACCESS_KEY,
                secretAccessKey: S3_SECRET_KEY
            },
            region: AWS_REGION,
            forcePathStyle: true
        });

        S3Service.instance = this;
        return this;
    }

    async uploadObject(key, body) {
        const params = {
            Bucket: S3_BUCKET,
            Key: key,
            Body: JSON.stringify(body)
        };
        const command = new PutObjectCommand(params);
        return this.run(command);
    }

    async uploadVideo(key, videoBuffer) {
        const params = {
          Bucket: S3_BUCKET,
          Key: key,
          Body: videoBuffer,             // JSON.stringify 제거, 바이너리 그대로 전달
          ContentType: 'video/mp4'       // 콘텐츠 타입 명시
        };
        const command = new PutObjectCommand(params);
        return this.run(command);
    }

    async uploadImage(key, imageBuffer) {
        const params = {
            Bucket: S3_BUCKET,
            Key: key,
            Body: imageBuffer,           // 바이너리 데이터 그대로 전달
            ContentType: 'image/jpeg'    // 콘텐츠 타입 명시 (필요에 따라 'image/png' 등 변경)
        };
        const command = new PutObjectCommand(params);
        return this.run(command);
    }
      
    async exists(key) {
        try {
            await this.headObject(key);
            return true;
        } catch (error) {
            return false;
        }
    }

    async headObject(key) {
        const params = {
            Bucket: S3_BUCKET,
            Key: key
        };
        const command = new HeadObjectCommand(params);
        return this.run(command);
    }

    async getObjectSize(key) {
        const { ContentLength: size } = await this.headObject(key);
        return size;
    }

    async getObject(key, range) {
        const params = {
            Bucket: S3_BUCKET,
            Key: key,
            Range: range ? `bytes=${range.start}-${range.end}` : undefined
        };
        const command = new GetObjectCommand(params);
        const { Body: body } = await this.run(command);
        return body;
    }

    async getObjectUrl(key) {
        const params = {
            Bucket: S3_BUCKET,
            Key: key
        };
        const command = new GetObjectCommand(params);
        return getSignedUrl(this.s3Client, command, { expiresIn: 86400 }); // 24 hours
    }

    async getObjectUrlMonth(key) {
        const params = {
            Bucket: S3_BUCKET,
            Key: key
        };
        const command = new GetObjectCommand(params);
        return getSignedUrl(this.s3Client, command, { expiresIn: 86400*7 }); // 24 hours
    }

    async getObjectAsJson(key) {
        const body = await this.getObject(key);
        const stringifiedData = await body.transformToString();
        return JSON.parse(stringifiedData);
    }

    async listObjects(prefix, regex) {
        const params = {
            Bucket: S3_BUCKET,
            Prefix: prefix
        };
        const command = new ListObjectsV2Command(params);
        const { Contents: objects } = await this.run(command);

        // Filter objects by regex and return the keys
        return objects?.filter((object) => regex.test(object.Key)).map((payload) => payload.Key) ?? [];
    }

    async deleteObject(key) {
        const params = {
            Bucket: S3_BUCKET,
            Key: key
        };
        const command = new DeleteObjectCommand(params);
        return this.run(command);
    }

    async run(command) {
        try {
            // console.log(command)
            return await this.s3Client.send(command);
        } catch (error) {
            // error.$response를 콘솔에 출력하여 원시 응답 내용을 확인
            console.error("Raw error response:", error.$response);
            throw error;
        }
    }
}
