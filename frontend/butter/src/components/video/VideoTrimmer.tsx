import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import Control from "./Control";
import { useForm } from "react-hook-form";

const VideoTrimmerWrapper = styled.div`
  width: 100%;
`;

const VideoContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
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

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const GoEditButton = styled(Button)`
  background-color: #0d99ff;
  width: 100px;
  color: white;
  padding: 12px;
  font-size: 16px;
`;

// 스타일 컴포넌트 추가
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* max-width: 500px; */
  margin: 20px auto;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #0d99ff;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
`;

const SubmitButton = styled(Button)`
  justify-content: end;
  background-color: #0d99ff;
  color: white;
  padding: 12px;
  width: 120px;
  font-size: 16px;
  border-radius: 8px;

  &:hover {
    background-color: #0d99ff;
  }
`;

const timeToSeconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const secondsToTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const TimeInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  font-family: monospace;
  text-align: center;
  width: 100px;

  &:focus {
    border-color: #0d99ff;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
const TimeInputContainer = styled.div`
  display: flex;

  align-content: center;
  justify-items: center;
  gap: 8px;
`;
const TimeDisplay = styled.div`
  align-content: center;
  font-size: 16px;
  color: #666;
`;
const TimeInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;
const TimeInfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Destinatedtime = styled.div`
  display: flex;
  flex-direction: column;
`;
const TrimButton = styled(Button)`
  justify-content: end;
  background-color: #0d99ff;
  color: white;
  padding: 12px;
  width: 120px;
  font-size: 16px;
  border-radius: 8px;

  &:hover {
    background-color: #0d99ff;
  }
`;

interface FormInputs {
  startTime: string; // HH:mm:ss 형식
  endTime: string;
}
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
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      startTime: "00:00:00",
      endTime: "00:00:00",
    },
  });

  useEffect(() => {
    if (duration > 0) {
      setValue("endTime", secondsToTime(duration));
    }
  }, [duration, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "startTime" && playerRef.current) {
        const seconds = timeToSeconds(value.startTime || "00:00:00");
        if (seconds <= duration) {
          handleSeek(seconds / duration);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, duration]);

  const cuttingVideo = () => {
    const formValues = watch(); // 현재 폼 데이터 가져오기
    const startSeconds = timeToSeconds(formValues.startTime);
    const endSeconds = timeToSeconds(formValues.endTime);

    console.log("🎬 영상 자르기 시작!");

    if (startSeconds >= endSeconds) {
      console.log("❌ 시작 시간이 종료 시간보다 같거나 클 수 없습니다.");
      return;
    }

    console.log(
      `✅ ${formValues.startTime} ~ ${formValues.endTime} 구간을 자릅니다.`
    );
  };

  const onSubmit = (data: FormInputs) => {
    const startSeconds = timeToSeconds(data.startTime);
    const endSeconds = timeToSeconds(data.endTime);
    console.log({ startSeconds, endSeconds });
    handleSeek(startSeconds / duration); // duration으로 나누어 주어야 합니다
    setVideoState((prev) => ({
      ...prev,
      playing: true, // 시간 설정 후 자동 재생
    }));
  };

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

  const handleGoEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <VideoTrimmerWrapper>
      <VideoContainer>
        {/* <Title>React Player</Title> */}
        <StyledContainer max-Width="md">
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
      {videoUrl &&
        (isEditing ? (
          <div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }
              }}
            >
              <TimeInfoWrapper>
                <TimeInfo>
                  <TimeDisplay>현재: {secondsToTime(currentTime)}</TimeDisplay>
                  <TimeDisplay>총 길이: {secondsToTime(duration)}</TimeDisplay>
                </TimeInfo>
                <Destinatedtime>
                  <TimeInputContainer>
                    <TimeDisplay>시작 시간</TimeDisplay>
                    <TimeInput
                      type="text"
                      placeholder="00:00:00"
                      maxLength={8}
                      {...register("startTime", {
                        required: "시작 시간을 입력하세요",
                        pattern: {
                          value: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
                          message: "HH:mm:ss 형식으로 입력하세요",
                        },
                        validate: {
                          validFormat: (value) => {
                            const [hours, minutes, seconds] = value
                              .split(":")
                              .map(Number);
                            if (minutes > 59 || seconds > 59)
                              return "올바른 시간을 입력하세요";
                            const totalSeconds =
                              hours * 3600 + minutes * 60 + seconds;
                            return (
                              totalSeconds <= duration ||
                              "비디오 길이를 초과할 수 없습니다"
                            );
                          },
                        },
                      })}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length > 4) {
                          value =
                            value.slice(0, 2) +
                            ":" +
                            value.slice(2, 4) +
                            ":" +
                            value.slice(4);
                        } else if (value.length > 2) {
                          value = value.slice(0, 2) + ":" + value.slice(2);
                        }
                        e.target.value = value;
                      }}
                    />
                  </TimeInputContainer>
                  {errors.startTime && (
                    <ErrorMessage>{errors.startTime.message}</ErrorMessage>
                  )}
                </Destinatedtime>
                <Destinatedtime>
                  <TimeInputContainer>
                    <TimeDisplay>종료 시간</TimeDisplay>
                    <TimeInput
                      type="text"
                      placeholder="00:00:00"
                      maxLength={8}
                      {...register("endTime", {
                        required: "종료 시간을 입력하세요",
                        pattern: {
                          value: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
                          message: "HH:mm:ss 형식으로 입력하세요",
                        },
                        validate: {
                          validFormat: (value) => {
                            const [hours, minutes, seconds] = value
                              .split(":")
                              .map(Number);
                            if (minutes > 59 || seconds > 59)
                              return "올바른 시간을 입력하세요";
                            const totalSeconds =
                              hours * 3600 + minutes * 60 + seconds;
                            return (
                              totalSeconds <= duration ||
                              "비디오 길이를 초과할 수 없습니다"
                            );
                          },
                          afterStart: (value) => {
                            const startSeconds = timeToSeconds(
                              watch("startTime")
                            );
                            const endSeconds = timeToSeconds(value);
                            return (
                              endSeconds > startSeconds ||
                              "종료 시간은 시작 시간보다 커야 합니다"
                            );
                          },
                        },
                      })}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length > 4) {
                          value =
                            value.slice(0, 2) +
                            ":" +
                            value.slice(2, 4) +
                            ":" +
                            value.slice(4);
                        } else if (value.length > 2) {
                          value = value.slice(0, 2) + ":" + value.slice(2);
                        }
                        e.target.value = value;
                      }}
                    />
                  </TimeInputContainer>
                  {errors.endTime && (
                    <ErrorMessage>{errors.endTime.message}</ErrorMessage>
                  )}
                </Destinatedtime>
              </TimeInfoWrapper>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <SubmitButton type="submit">시간 설정</SubmitButton>
              </div>
            </Form>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <TrimButton onClick={cuttingVideo}>영상 자르기</TrimButton>
            </div>
          </div>
        ) : (
          <GoEditButton onClick={handleGoEdit}>Go Edit</GoEditButton>
        ))}
    </VideoTrimmerWrapper>
  );
};

export default VideoTrimmer;
