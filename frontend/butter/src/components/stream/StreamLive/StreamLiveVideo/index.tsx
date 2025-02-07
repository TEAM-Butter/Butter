import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";
import "./index.css";
import axios from "axios";

interface StreamLiveVideoProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  local?: boolean;
  roomName: string;
}

function StreamLiveVideo({
  track,
  participantIdentity,
  local = false,
  roomName,
}: StreamLiveVideoProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const streamInterval = 200; // 200ms 간격으로 프레임 전송

  const sendFrameToServer = async () => {
    if (!videoElement.current) return;

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoElement.current.videoWidth;
      canvas.height = videoElement.current.videoHeight;

      context?.drawImage(videoElement.current, 0, 0);

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("file", blob);
            // 참가자 정보와 룸 정보도 함께 전송
            formData.append("participant", participantIdentity);
            formData.append("room", roomName);
            formData.append("isLocal", String(local));

            const serverUrl = "http://your-flask-server:5000/ai/upload_frame";
            try {
              const res = await axios.post(serverUrl, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              console.log("서버 응답:", res.data);
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.error("전송 오류:", error.message);
              } else {
                console.error("알 수 없는 오류:", error);
              }
            }
          }
        },
        "image/jpeg",
        0.95
      );
    } catch (err) {
      console.error("프레임 캡처 중 오류:", err);
    }
  };

  useEffect(() => {
    if (videoElement.current) {
      track.attach(videoElement.current);
      const intervalId = setInterval(sendFrameToServer, streamInterval);
      return () => {
        clearInterval(intervalId);
        track.detach();
      };
    }

    return () => {
      track.detach();
    };
  }, [track, streamInterval]);

  return (
    <div id={"camera-" + participantIdentity} className="video-container">
      <div className="participant-data">
        <p>{roomName}</p>
        <p>{participantIdentity}</p>
      </div>
      <video ref={videoElement} id={track.sid}></video>
    </div>
  );
}

export default StreamLiveVideo;
