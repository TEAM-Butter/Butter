import { LocalAudioTrack, RemoteAudioTrack } from "livekit-client";
import { useEffect, useRef } from "react";

interface StreamLiveAudioProps {
  track: LocalAudioTrack | RemoteAudioTrack;
}

function StreamLiveAudio({ track }: StreamLiveAudioProps) {
  const audioElement = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioElement.current) {
      track.attach(audioElement.current);
    }

    return () => {
      track.detach();
    };
  }, [track]);

  return <audio ref={audioElement} id={track.sid} />;
}

export default StreamLiveAudio;
