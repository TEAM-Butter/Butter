/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_LIVEKIT_URL: string;
  readonly VITE_LIVEKIT_API_KEY: string;
  readonly VITE_S3_ENDPOINT: string;
  readonly VITE_S3_BUCKET: string;
  readonly VITE_AWS_REGION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
