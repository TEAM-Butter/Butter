export const SERVER_PORT = process.env.SERVER_PORT || 6080;
export const APP_NAME = "openvidu-recording-advanced-node";

// LiveKit configuration
export const LIVEKIT_URL = process.env.LIVEKIT_URL || "http://localhost:7880";
// export const LIVEKIT_URL = "http://localhost:7880";
export const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "devkey";
export const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || "secret";

// S3 configuration
export const S3_ENDPOINT = process.env.S3_ENDPOINT || "http://localhost:9000";
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || "minioadmin";
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY || "minioadmin";
export const AWS_REGION = process.env.AWS_REGION || "us-east-1";
export const S3_BUCKET = process.env.S3_BUCKET || "openvidu";

export const RECORDINGS_PATH = process.env.RECORDINGS_PATH ?? "recordings/";
export const CLIPS_TMP_PATH = process.env.CLIPS_PATH ?? "recordings/tmp/";
export const CLIPS_PATH = process.env.CLIPS_PATH ?? "clips/";
export const RECORDINGS_METADATA_PATH = ".metadata/";
export const RECORDING_PLAYBACK_STRATEGY =
  process.env.RECORDING_PLAYBACK_STRATEGY || "S3"; // PROXY or S3
export const RECORDING_FILE_PORTION_SIZE = 5 * 1024 * 1024; // 5MB

// MySql configuration
export const MYSQL_ENDPOINT = process.env.MYSQL_ENDPOINT || "mysql";
export const MYSQL_USER = process.env.MYSQL_USER || "root";
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "ssafy12p1e204";
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "butter";
