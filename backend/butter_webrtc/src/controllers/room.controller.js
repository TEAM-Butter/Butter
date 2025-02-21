import { Router } from "express";
import { AccessToken } from "livekit-server-sdk";
import { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } from "../config.js";
import { RoomService } from "../services/room.service.js";

const roomService = new RoomService();

export const roomController = Router();

roomController.post("/", async (req, res) => {
  const roomName = req.body.roomName;
  const participantName = req.body.participantName;
  const role = req.body.participantRole;

  if (!roomName || !participantName) {
    res
      .status(400)
      .json({ errorMessage: "roomName and participantName are required" });
    return;
  }

  try {
    // Create room if it doesn't exist
    const exists = await roomService.exists(roomName);

    if (!exists && role !== "publisher") {
      return res
        .status(403)
        .json({ errorMessage: "Subscribers cannot create a new room" });
    }

    if (!exists) {
        await roomService.createRoom(roomName);
    }

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: participantName,
    });
    at.addGrant({ room: roomName, roomJoin: true, roomRecord: true });
    const token = await at.toJwt();

    res.json({ token });
  } catch (error) {
    console.error("Error creating room.", error);
    res.status(500).json({ errorMessage: "Error creating room" });
  }
});

// Handle participant leave event
roomController.post("/leave", async (req, res) => {
  const { roomName, participantName, role } = req.body;

  if (!roomName || !participantName || !role) {
    return res.status(400).json({
      errorMessage: "roomName, participantName, and role are required",
    });
  }

  try {
    if (role === "publisher") {
      console.log(
        `Last publisher left ${roomName}. Scheduling room closure in 1 minutes.`
      );

      // Schedule room deletion
      // const timer = setTimeout(async () => {
      //     console.log(`Closing room ${roomName}...`);
      //     await roomService.deleteRoom(roomName);
      // }, 1 * 60 * 1000); // 1 minutes
    }

    res.json({ message: "Leave event processed." });
  } catch (error) {
    console.error("Error handling leave event.", error);
    res.status(500).json({ errorMessage: "Error handling leave event" });
  }
});
