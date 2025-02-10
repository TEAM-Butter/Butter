import React, { useEffect, useState } from "react";
import { RecordingService } from "./RecordingService";
import { RecordingList } from "./RecordingList";
import { RecordingModal } from "./RecordingModal";
import { Recording } from "./types";

interface RecordingManagerProps {
  recordingService: RecordingService;
  roomName: string;
  roomId: string;
}

export const RecordingManager: React.FC<RecordingManagerProps> = ({
  recordingService,
  roomName,
  roomId,
}) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const loadRecordings = async () => {
    try {
      const recordingList = await recordingService.listRecordings(
        roomName,
        roomId
      );
      setRecordings(recordingList);
    } catch (error) {
      console.error("Failed to load recordings:", error);
    }
  };

  useEffect(() => {
    loadRecordings();
  }, [roomName, roomId]);

  const handlePlay = async (recordingName: string) => {
    try {
      const url = await recordingService.getRecordingUrl(recordingName);
      setCurrentVideoUrl(url);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to get recording URL:", error);
    }
  };

  const handleDelete = async (recordingName: string) => {
    try {
      await recordingService.deleteRecording(recordingName);
      setRecordings(recordings.filter((r) => r.name !== recordingName));
    } catch (error) {
      console.error("Failed to delete recording:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recordings</h2>
      <RecordingList
        recordings={recordings}
        onPlay={handlePlay}
        onDelete={handleDelete}
      />
      <RecordingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentVideoUrl("");
        }}
        videoUrl={currentVideoUrl}
      />
    </div>
  );
};
