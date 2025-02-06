import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["192-168-123-102.openvidu-local.dev", "i12e204.p.ssafy.io"],
    //https: {
    //  key: fs.readFileSync("./key.pem"),
    //  cert: fs.readFileSync("./cert.pem"),
    //},
  },
});
