import "dotenv/config.js";
import express from "express";
import cors from "cors";
import path from "path";
import https from "https";
import fs from "fs";
import { fileURLToPath } from "url";
import { SERVER_PORT } from "./config.js";
import { roomController } from "./controllers/room.controller.js";
import { recordingController } from "./controllers/recording.controller.js";
import { webhookController } from "./controllers/webhook.controller.js";

const app = express();

app.use(express.json());

// 특정 도메인만 허용하고 싶다면:
app.use(cors({
  origin: 'https://i12e204.p.ssafy.io', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

// Set the static files location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/token", roomController);
app.use("/api/recordings", recordingController);
app.use("/api/livekit/webhook", webhookController);

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});

//const options = {
// key: fs.readFileSync("./keys/key.pem"),
//  cert: fs.readFileSync("./keys/cert.pem"),
//};
//https.createServer(options, app).listen(SERVER_PORT, function () {
//  console.log("HTTPS server listening on port " + SERVER_PORT);
//});
