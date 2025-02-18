import { Router } from "express";
import { RecordingService } from "../services/recording.service.js";
import { RoomService } from "../services/room.service.js";
import { ClipService } from "../services/clip.service.js";

const recordingService = new RecordingService();
const roomService = new RoomService();
const clipService = new ClipService();

export const clipController = Router();

clipController.post("/", async (req, res) => {
  const { recordingName, startTime, endTime, time } = req.body;

  if (!recordingName || !startTime || !endTime || !time) {
    res.status(400).json({
      errorMessage: "recordingName, startTime, endTime and time are required",
    });
    return;
  }

  try {
    // clipRecording 서비스 호출
    const result = await clipService.clipRecording(
      recordingName,
      startTime,
      endTime,
      time
    );

    if (result.success) {
      res.json({
        message: "Recording clipped successfully",
        clipUrl: result.clipUrl,
        clipName: result.clipName,
      });
    } else {
      res.status(500).json({
        errorMessage: "Error clipping recording",
        details: result.error,
      });
    }
  } catch (error) {
    console.error("Error clipping recording.", error);
    res.status(500).json({ errorMessage: "Error clipping recording" });
  }
});

clipController.get("/:crewId", async (req, res) => {
  const { crewId } = req.params;
  try {
    const result = await clipService.listClips(crewId);
    if (result.success) {
      res.json({ message: "Get List successfully", result: result });
    } else {
      res
        .status(500)
        .json({ errorMessage: "Error get clip list", details: result.error });
    }
  } catch (error) {
    console.error("Error get clips.", error);
    res.status(500).json({ errorMessage: "Error get clips" });
  }
});

clipController.get("/:title/:clipName/:clipUrl", async (req, res) => {
  const { title, clipName, clipUrl } = req.params;
  const exists = await clipService.existsClip(clipName);

  if (!exists) {
    res.status(404).json({ errorMessage: "Clip not found" });
    return;
  }

  try {
    const result = await clipService.saveClipRecording(title, clipName, clipUrl);
    if (result.success) {
      res.json({
        message: "Clip save successfully",
        clipName: result.clipName,
      });
    } else {
      res
        .status(500)
        .json({ errorMessage: "Error clipping saving", details: result.error });
    }
  } catch (error) {
    console.error("Error save clips.", error);
    res.status(500).json({ errorMessage: "Error save clips" });
  }
});

clipController.delete("/:clipName", async (req, res) => {
  const { clipName } = req.params;
  const exists = await clipService.existsClip(clipName);

  if (!exists) {
    res.status(404).json({ errorMessage: "Clip not found" });
    return;
  }

  try {
    await clipService.deleteClip(clipName);
    res.json({ message: "Recording deleted" });
  } catch (error) {
    console.error("Error deleting recording.", error);
    res.status(500).json({ errorMessage: "Error deleting recording" });
  }
});
