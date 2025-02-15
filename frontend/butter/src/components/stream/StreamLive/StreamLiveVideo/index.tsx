import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";
import "./index.css";

interface StreamLiveVideoProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  local?: boolean;
  roomName: string;
  role: string;
}

function StreamLiveVideo({
  track,
  participantIdentity,
  roomName,
  role,
  local = false, // local 속성 추가
}: StreamLiveVideoProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const streamInterval = 500; // 200ms 간격으로 프레임 전송

  const sendFrameToServer = async () => {
    if (!videoElement.current || !local) return;

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoElement.current.videoWidth;
      canvas.height = videoElement.current.videoHeight;

      context?.drawImage(videoElement.current, 0, 0);
      //Websocket연결 형성할 때 본인이 시청자인지 크루인지 정보.

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const formData = new FormData();
            console.log("streamer의 영상을 서버로 보냅니다");
            formData.append("file", blob);

            // 참가자 정보와 룸 정보도 함께 전송
            formData.append("participant", participantIdentity);
            //수정
            formData.append("role", role);
            formData.append("room-id", roomName);

            const serverUrl = `${
              import.meta.env.VITE_FLASK_SERVER
            }/ai/upload_frame`;

            // const agent = new https.Agent({
            //   rejectUnauthorized: false,
            // });

            try {
              // fetch API 사용
              console.log("serverUrl", serverUrl);
              const response = await fetch(serverUrl, {
                method: "POST",
                body: formData,
                mode: "cors",
                headers: {
                  Accept: "application/json",
                },
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();
              console.log("서버 응답:", data);
              console.log("ServerURl:", serverUrl);
            } catch (error) {
              if (
                error instanceof TypeError &&
                error.message === "Failed to fetch"
              ) {
                console.error(
                  "서버 연결 실패. 서버가 실행 중인지 확인해주세요."
                );
                console.log(error);
              } else {
                console.error("전송 오류:", error);
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
      const intervalId = local
        ? setInterval(sendFrameToServer, streamInterval)
        : null;
      return () => {
        if (intervalId) clearInterval(intervalId);
        track.detach();
      };
    }

    return () => {
      track.detach();
    };
  }, [track, streamInterval, local]);

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
