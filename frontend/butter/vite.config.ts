import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["192-168-30-199.openvidu-local.dev"],
    //https: {
    //  key: fs.readFileSync("./key.pem"),
    //  cert: fs.readFileSync("./cert.pem"),
    //},
  },
});
