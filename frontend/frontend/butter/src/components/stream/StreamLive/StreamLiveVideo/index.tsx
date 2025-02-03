import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";
import "./index.css";

interface StreamLiveVideoProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  local?: boolean;
  roomName: string;
}

function StreamLiveVideo({
  track,
  participantIdentity,
  roomName,
}: // local = false,
StreamLiveVideoProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoElement.current) {
      track.attach(videoElement.current);
    }

    return () => {
      track.detach();
    };
  }, [track]);

  return (
    <div id={"camera-" + participantIdentity} className="video-container">
      <div className="participant-data">
        <p>{roomName}</p>
        <p>{participantIdentity}</p>
        {/* <p>{participantIdentity + (local ? " (You)" : "")}</p> */}
      </div>
      <video ref={videoElement} id={track.sid}></video>
    </div>
  );
}

export default StreamLiveVideo;
