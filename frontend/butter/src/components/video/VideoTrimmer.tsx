import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import Control from "./Control";

const VideoTrimmerWrapper = styled.div`
  width: 100%;
`;

const VideoContainer = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 24px;
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; //16:9 Aspect Ratio
  /* padding-top: 20px; */
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .player {
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover .controls-overlay {
    opacity: 1;
  }
`;

const ControlOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
`;

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

interface VideoTrimmerProps {
  videoUrl: string;
}
interface VideoState {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  seeking: boolean;
  buffer: boolean; // Buffer -> buffer로 수정
}

const VideoTrimmer = ({ videoUrl }: VideoTrimmerProps) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [videoState, setVideoState] = useState<VideoState>({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    if (playerRef.current) {
      const newPlayingState = !videoState.playing;
      setVideoState((prev) => ({
        ...prev,
        playing: newPlayingState,
      }));
      // playerRef.current.playing 속성을 직접 설정
      if (newPlayingState) {
        playerRef.current.getInternalPlayer()?.play();
      } else {
        playerRef.current.getInternalPlayer()?.pause();
      }
    }
  };

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
    setVideoState((prev) => ({ ...prev, played: time }));
  };

  const handleVolumeChange = (newVolume: number) => {
    setVideoState((prev) => ({ ...prev, volume: newVolume }));
  };

  const handleProgress = (state: { played: number }) => {
    if (!videoState.seeking) {
      setVideoState((prev) => ({ ...prev, played: state.played }));
    }
  };

  return (
    <VideoTrimmerWrapper>
      <VideoContainer>
        {/* <Title>React Player</Title> */}
        <StyledContainer maxWidth="md">
          <PlayerWrapper>
            <ReactPlayer
              ref={playerRef}
              className="player"
              url={videoUrl}
              width="100%"
              height="100%"
              playing={videoState.playing}
              muted={videoState.muted}
              volume={videoState.volume}
              onDuration={(d) => setDuration(d)}
              onProgress={(state) => {
                if (!videoState.seeking) {
                  setVideoState((prev) => ({ ...prev, played: state.played }));
                  setCurrentTime(state.playedSeconds);
                }
              }}
              progressInterval={1000}
              controls={false}
              onReady={() => {
                // 플레이어가 준비되면 초기 상태 설정
                setVideoState((prev) => ({ ...prev, playing: true }));
              }}
            />
            <ControlOverlay className="controls-overlay">
              <Control
                onPlayPause={handlePlayPause}
                playing={videoState.playing}
                onSeek={handleSeek}
                onVolumeChange={handleVolumeChange}
                volume={videoState.volume}
                played={videoState.played}
                duration={duration}
                currentTime={currentTime}
              />
            </ControlOverlay>
          </PlayerWrapper>
        </StyledContainer>
      </VideoContainer>
    </VideoTrimmerWrapper>
  );
};

export default VideoTrimmer;
