import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //server: {
  //  host: true,
  //https: {
  //  key: fs.readFileSync("./key.pem"),
  //  cert: fs.readFileSync("./cert.pem"),
  //},
  //},
});
