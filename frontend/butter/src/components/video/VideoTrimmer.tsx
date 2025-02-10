import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const VideoTrimmerWrapper = styled.div`
  width: 100%;
`;

const Video = styled.video`
  width: 100%;
`;

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;
const ScrollWrapper = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
  background-color: aliceblue;
`;

const ScrollStartBar = styled.div<{ $startPoint: number }>`
  position: absolute;
  left: ${({ $startPoint }) => `${$startPoint}px`};
  width: 4px;
  height: 100%;
  background-color: red;
`;

const ScrollEndBar = styled.div<{ $startPoint: number }>`
  position: absolute;
  left: ${({ $startPoint }) => `${$startPoint}px`};
  width: 4px;
  height: 100%;
  background-color: blue;
`;

const ScrollDetailWrapper = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
  background-color: beige;
`;

interface VideoTrimmerProps {
  videoUrl: string;
}

const VideoTrimmer = ({ videoUrl }: VideoTrimmerProps) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startPos, setStartPos] = useState<number>(0);
  const [endPos, setEndPos] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onloadedmetadata = () => {
      setDuration(video.duration);
    };

    video.ontimeupdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);

      if (time >= duration * endPos) {
        video.currentTime = duration * startPos;
        setIsPlaying(false);
        video.pause();
      }
    };
  }, [duration, startPos, endPos]);

  const handlePlayPause = (): void => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // 1000px -> 8px  120분 * 8 / 1000 -> 0.96분 -> 57.6초

  //  120분 1.2분 * 10 12분인가?

  const [isScrollingStart, setIsScrollingStart] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [scrollEndX, setScrollEndX] = useState(0);

  console.log("gap", scrollEndX - scrollStartX);

  return (
    <VideoTrimmerWrapper>
      <Video ref={videoRef} src={videoUrl} />

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlayPause}
          >
            {isPlaying ? "일시정지" : "재생"}
          </motion.button>
          <span className="text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        {/* Timeline */}
        <div className="mt-4">
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{formatTime(duration * startPos)}</span>

            <span>{formatTime(duration * endPos)}</span>
          </div>
        </div>

        <ScrollBox>
          <ScrollWrapper
            onMouseDown={(event) => {
              setIsScrollingStart(true);
              const point = event.nativeEvent.offsetX;

              setScrollStartX(point);
              setScrollEndX(0);
            }}
            onMouseMove={(event) => {
              if (isScrollingStart) {
                console.log("event", event.nativeEvent.offsetX);
              }
            }}
            onMouseUp={(event) => {
              setIsScrollingStart(false);
              setScrollEndX(event.nativeEvent.offsetX);
            }}
            onMouseLeave={() => {
              if (isScrollingStart) setIsScrollingStart(false);
            }}
          >
            {scrollStartX && (
              <ScrollStartBar
                // onMouseDown={(event) => {
                //   setIsScrollingStart(true);
                //   setScrollStartX(event.nativeEvent.offsetX);
                // }}
                // onMouseMove={(event) => {
                //   setScrollStartX(event.nativeEvent.offsetX);
                // }}
                // onMouseUp={(event) => {
                //   setScrollStartX(event.nativeEvent.offsetX);
                // }}
                $startPoint={scrollStartX}
              />
            )}
            {/* {scrollEndX && <ScrollEndBar $startPoint={scrollEndX} />} */}
          </ScrollWrapper>
          <ScrollDetailWrapper />
        </ScrollBox>
        <motion.div
          className="flex gap-2 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const video = videoRef.current;
              if (video) {
                video.currentTime = duration * startPos;
              }
            }}
          >
            시작점으로 이동
          </motion.button>
          <motion.button
            className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            닫기
          </motion.button>
        </motion.div>
      </div>
    </VideoTrimmerWrapper>
  );
};

export default VideoTrimmer;
