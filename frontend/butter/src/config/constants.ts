export const LIVEKIT_CONFIG = {
  url: import.meta.env.VITE_LIVEKIT_URL || "http://localhost:7880",
  apiKey: import.meta.env.VITE_LIVEKIT_API_KEY || "devkey",
} satisfies Record<string, string>;

export const S3_CONFIG = {
  endpoint: import.meta.env.VITE_S3_ENDPOINT || "http://localhost:9000",
  bucket: import.meta.env.VITE_S3_BUCKET || "openvidu",
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
} satisfies Record<string, string>;
