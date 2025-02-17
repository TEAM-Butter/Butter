import styled from "@emotion/styled";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const VideoClipPageWrapper = styled.div`
  max-width: 2000px;
  margin: auto;
  padding-top: 15px; // 하나로 통일
  overflow: hidden; // 추가
`;

const T1 = styled.div`
  margin: 20px;
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  border-radius: 4px;
`;

interface Video {
  id: string;
  url: string;
  title: string;
}

export interface Recording {
  id: string; // 녹화 ID
  name: string; // 녹화 파일 이름
  roomId: string; // 녹화된 방 ID
  roomName: string; // 녹화된 방 이름
  duration: number; // 녹화 길이 (초 단위)
  size: number; // 녹화 파일 크기 (바이트 단위)
  startedAt: number; // 녹화 시작 시간 (Unix Timestamp)
}

const videoList = [
  {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Sample Video 1",
  },
  {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Sample Video 2",
  },
  {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    title: "Sample Video 3",
  },
];
const VideoClipPage = () => {
  const [slides, setslides] = useState<number[]>([1, 2, 3, 4, 5]);
  const [recordings, setRecordings] = useState<Recording[] | null>(null);
  const [recordingUrls, setRecordingUrls] = useState<{ [key: string]: string }>(
    {}
  );
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const SEVER_URL = import.meta.env.VITE_NODE_JS_SERVER || "";

  const prevIndex = useRef<number>(0);
  // 슬라이드 변경 시 현재 비디오만 자동 재생

  const handleSlideChange = (swiper: any) => {
    videoRefs.current.forEach((video, index) => {
      if (index === swiper.realIndex) {
        video.currentTime = 0; // 처음으로 이동
        video.play(); // 재생
      } else {
        video.pause(); // 정지
        video.currentTime = 0; // 처음으로 이동
      }
    });

    prevIndex.current = swiper.realIndex; // 현재 슬라이드 인덱스 업데이트
  };

  // 0 <-> 2 이동 시 play()가 실행되지 않는 문제 해결
  const handleTransitionEnd = (swiper: any) => {
    if (
      (prevIndex.current === 2 && swiper.realIndex === 0) ||
      (prevIndex.current === 0 && swiper.realIndex === 2)
    ) {
      setTimeout(() => {
        const video = videoRefs.current[swiper.realIndex];
        if (video) {
          video.currentTime = 0;
          video.play();
        }
      }, 100); // Swiper가 슬라이드를 변경하는 타이밍을 맞추기 위해 지연
    }
  };

  return (
    <VideoClipPageWrapper>
      <T1>Video Clip</T1>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange} // 기본 슬라이드 변경 처리
        onTransitionEnd={handleTransitionEnd} // 0↔2 이동 시 play() 강제 실행
        modules={[Mousewheel]}
        className="mySwiper"
        style={{
          aspectRatio: 16 / 10,
          backgroundColor: "beige",
        }}
      >
        {videoList.map((video, idx) => (
          <SwiperSlide key={idx}>
            <VideoPlayer
              ref={(el) => (videoRefs.current[idx] = el!)}
              src={video.url}
              controls
              autoPlay
              muted
              style={{
                aspectRatio: 16 / 9,
              }}
              onEnded={(e) => {
                e.currentTarget.currentTime = 0; // 처음으로 이동
                e.currentTarget.play(); // 다시 자동 재생
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </VideoClipPageWrapper>
  );
};

export default VideoClipPage;
