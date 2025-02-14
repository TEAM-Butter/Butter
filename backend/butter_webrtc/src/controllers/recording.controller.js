import { Router } from "express";
import { RecordingService } from "../services/recording.service.js";
import { RoomService } from "../services/room.service.js";
import { RECORDING_PLAYBACK_STRATEGY } from "../config.js";
import multer from "multer";

const recordingService = new RecordingService();
const roomService = new RoomService();

export const recordingController = Router();
const upload = multer();

recordingController.post("/start", async (req, res) => {
    const { roomName } = req.body;

    if (!roomName) {
        res.status(400).json({ errorMessage: "roomName is required" });
        return;
    }

    const activeRecording = await recordingService.getActiveRecordingByRoom(roomName);

    // Check if there is already an active recording for this room
    if (activeRecording) {
        res.status(409).json({ errorMessage: "Recording already started for this room" });
        return;
    }

    try {
        const recording = recordingService.startRecording(roomName);
        res.json({ message: "Recording started", recording });
    } catch (error) {
        console.error("Error starting recording.", error);
        res.status(500).json({ errorMessage: "Error starting recording" });
    }
});

recordingController.post("/stop", async (req, res) => {
    const { roomName } = req.body;

    if (!roomName) {
        res.status(400).json({ errorMessage: "roomName is required" });
        return;
    }

    const activeRecording = await recordingService.getActiveRecordingByRoom(roomName);

    // Check if there is an active recording for this room
    if (!activeRecording) {
        res.status(409).json({ errorMessage: "Recording not started for this room" });
        return;
    }

    try {
        const recording = await recordingService.stopRecording(activeRecording);
        res.json({ message: "Recording stopped", recording });
    } catch (error) {
        console.error("Error stopping recording.", error);
        res.status(500).json({ errorMessage: "Error stopping recording" });
    }
});

recordingController.get("/", async (req, res) => {
    const roomName = req.query.roomName?.toString();
    const roomId = req.query.roomId?.toString();

    try {
        const recordings = await recordingService.listRecordings(roomName, roomId);
        res.json({ recordings });
    } catch (error) {
        console.error("Error listing recordings.", error);
        res.status(500).json({ errorMessage: "Error listing recordings" });
    }
});

recordingController.get("/:recordingName", async (req, res) => {
    const { recordingName } = req.params;
    const { range } = req.headers;
    const exists = await recordingService.existsRecording(recordingName);

    if (!exists) {
        res.status(404).json({ errorMessage: "Recording not found" });
        return;
    }

    try {
        // Get the recording file from S3
        const { stream, size, start, end } = await recordingService.getRecordingStream(recordingName, range);

        // Set response headers
        res.status(206);
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
        res.setHeader("Content-Length", end - start + 1);

        // Pipe the recording file to the response
        stream.pipe(res).on("finish", () => res.end());
    } catch (error) {
        console.error("Error getting recording.", error);
        res.status(500).json({ errorMessage: "Error getting recording" });
    }
});

recordingController.get("/:recordingName/url", async (req, res) => {
    const { recordingName } = req.params;
    const exists = await recordingService.existsRecording(recordingName);

    if (!exists) {
        res.status(404).json({ errorMessage: "Recording not found" });
        return;
    }

    // If the recording playback strategy is "PROXY", return the endpoint URL
    if (RECORDING_PLAYBACK_STRATEGY === "PROXY") {
        res.json({ recordingUrl: `/recordings/${recordingName}` });
        return;
    }

    try {
        // If the recording playback strategy is "S3", return a signed URL to access the recording directly from S3
        const recordingUrl = await recordingService.getRecordingUrl(recordingName);
        res.json({ recordingUrl });
    } catch (error) {
        console.error("Error getting recording URL.", error);
        res.status(500).json({ errorMessage: "Error getting recording URL" });
    }
});

recordingController.post("/clip", async (req, res) => {
    const { recordingName, startTime, endTime, time } = req.body;

    if (!recordingName || !startTime || !endTime || !time) {
        res.status(400).json({ errorMessage: "recordingName, startTime, endTime and time are required" });
        return;
    }

    try {
        // clipRecording 서비스 호출
        const result = await recordingService.clipRecording(recordingName, startTime, endTime, time);

        if (result.success) {
            res.json({ message: "Recording clipped successfully", clipUrl: result.clipUrl, clipName: result.clipName});
        } else {
            res.status(500).json({ errorMessage: "Error clipping recording", details: result.error });
        }
    } catch (error) {
        console.error("Error clipping recording.", error);
        res.status(500).json({ errorMessage: "Error clipping recording" });
    }
});

recordingController.get("/:title/:clipName", async (req, res) => {
    const { title, clipName } = req.params;
    const exists = await recordingService.existsClipTmp(clipName);

    if (!exists) {
        res.status(404).json({ errorMessage: "Clip not found" });
        return;
    }

    try {
        const result = await recordingService.saveClipRecording(clipName);
        if (result.success) {
            res.json({ message: "Clip save successfully", clipName: result.clipName});
        } else {
            res.status(500).json({ errorMessage: "Error clipping saving", details: result.error });
        }
    } catch (error) {
        console.error("Error save clips.", error);
        res.status(500).json({ errorMessage: "Error save clips" });
    }
});

recordingController.post("/thumnail", upload.single("image"), async (req, res) => {
    const { recordingName } = req.body;
    const imageFile = req.file;

    if (!recordingName) {
        res.status(400).json({ errorMessage: "recordingName is required" });
        return;
    }

    if (!imageFile) {
        return res.status(400).json({ errorMessage: "Image file is required" });
    }

    try {
       // 썸네일 저장
       const result = await recordingService.saveThumbnail(recordingName, imageFile.buffer);

       if (result.success) {
           res.json({ message: "Thumbnail saved successfully", thumbnailKey: result.thumbnailKey });
       } else {
           res.status(500).json({ errorMessage: "Error saving thumbnail", details: result.error });
       }
   } catch (error) {
       console.error("Error saving thumbnail:", error);
       res.status(500).json({ errorMessage: "Error saving thumbnail" });
   }
});

recordingController.get("/thumbnail/:recordingName", async (req, res) => {
    const { recordingName } = req.params;
  
    if (!recordingName) {
      return res.status(400).json({ errorMessage: "recordingName is required" });
    }
  
    try {
      const thumbnailUrl = await recordingService.getThumbnailUrl(recordingName);
      if (!thumbnailUrl) {
        return res.status(404).json({ errorMessage: "Thumbnail not found" });
      }
      res.json({ thumbnailUrl });
    } catch (error) {
      console.error("Error fetching thumbnail:", error);
      res.status(500).json({ errorMessage: "Error fetching thumbnail" });
    }
  });

recordingController.delete("/:recordingName", async (req, res) => {
    const { recordingName } = req.params;
    const exists = await recordingService.existsRecording(recordingName);

    if (!exists) {
        res.status(404).json({ errorMessage: "Recording not found" });
        return;
    }

    try {
        const { roomName } = await recordingService.getRecordingMetadata(recordingName);
        await recordingService.deleteRecording(recordingName);

        // Notify to all participants that the recording was deleted
        const existsRoom = await roomService.exists(roomName);

        if (existsRoom) {
            await roomService.sendDataToRoom(roomName, { recordingName });
        }

        res.json({ message: "Recording deleted" });
    } catch (error) {
        console.error("Error deleting recording.", error);
        res.status(500).json({ errorMessage: "Error deleting recording" });
    }
});
