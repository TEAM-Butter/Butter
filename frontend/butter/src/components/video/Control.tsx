import { Slider } from "@mui/material";
import styled from "@emotion/styled";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeUp,
} from "@mui/icons-material";

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
`;

const TopContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 16px;

  h2 {
    color: #333;
    margin: 0;
  }
`;

const MidContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #999;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: #0d99ff;
    background: rgba(149, 86, 204, 0.1);
  }
`;

const BottomContainer = styled.div`
  width: 100%;
`;

const SliderContainer = styled.div`
  padding: 0 20px;
  margin-bottom: 16px;
`;

const ControlBox = styled.div`
  width: 100%;
`;

const InnerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
`;

const CustomSlider = styled(Slider)`
  color: #0d99ff;
  height: 4px;

  .MuiSlider-thumb {
    width: 16px;
    height: 16px;
    background-color: #0d99ff;

    &:hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 8px rgba(149, 86, 204, 0.16);
    }
  }

  .MuiSlider-rail {
    opacity: 0.28;
  }
`;

const VolumeSlider = styled(CustomSlider)`
  width: 100px;
  margin: 0 16px;
`;

// 추가 스타일 컴포넌트
const VolumeControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeDisplay = styled.span`
  color: #666;
  font-size: 14px;
`;

interface ControlProps {
  onPlayPause: () => void;
  playing: boolean;
  onSeek?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  volume?: number;
  played?: number;
  duration?: number;
  currentTime?: number;
}

const Control = ({
  onPlayPause,
  playing,
  onSeek,
  onVolumeChange,
  volume = 0.5,
  played = 0,
  duration = 0,
  currentTime = 0,
}: ControlProps) => {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeekChange = (_event: Event, newValue: number | number[]) => {
    if (onSeek && typeof newValue === "number") {
      onSeek(newValue / 100);
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    if (onVolumeChange && typeof newValue === "number") {
      onVolumeChange(newValue / 100);
    }
  };

  const handleFastRewind = () => {
    if (onSeek) {
      onSeek(Math.max(0, (currentTime - 10) / duration));
    }
  };

  const handleFastForward = () => {
    if (onSeek) {
      onSeek(Math.min(1, (currentTime + 10) / duration));
    }
  };

  return (
    <ControlContainer>
      <MidContainer>
        <IconButton onClick={handleFastRewind}>
          <FastRewind />
        </IconButton>
        <IconButton onClick={onPlayPause}>
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleFastForward}>
          <FastForward />
        </IconButton>
      </MidContainer>

      <BottomContainer>
        <SliderContainer>
          <CustomSlider
            value={played * 100}
            onChange={handleSeekChange}
            aria-label="Progress"
          />
        </SliderContainer>

        <ControlBox>
          <InnerControls>
            <IconButton onClick={onPlayPause}>
              {playing ? <Pause /> : <PlayArrow />}
            </IconButton>
            <VolumeControls>
              <IconButton>
                <VolumeUp />
              </IconButton>
              <VolumeSlider
                value={volume * 100}
                onChange={handleVolumeChange}
                aria-label="Volume"
              />
            </VolumeControls>
            <TimeDisplay>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeDisplay>
          </InnerControls>
        </ControlBox>
      </BottomContainer>
    </ControlContainer>
  );
};

export default Control;
