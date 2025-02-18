import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../apis/axiosInstance";

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
  id: string; // 녹화 ID
  crewId: number; // 녹화된 크루 ID
  title: string; // 녹화 파일 이름
  videoName: string; // 녹화 파일 이름
  videoUrl: string; // 녹화 파일 이름
  hitCount: number; // 조회수
}

const VideoClipPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentClipId, setCurrentClipId] = useState<number | null>(null);
  const currentClipIdRef = useRef<number | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const SEVER_URL = import.meta.env.VITE_SPRING_BOOT_SERVER || "";

  // 첫 영상 목록을 역순으로 가져오기
  useEffect(() => {
    const fetchInitialVideos = async () => {
      try {
        const response = await axiosInstance.get(`/clip/list_rev`, {
          params: {
            clipId: null,
            pageSize: 1,
            liveId: null,
          }
        });
        setVideos(response.data);
        if (response.data.length > 0) {
          setCurrentClipId(response.data[0].id);
          currentClipIdRef.current = response.data[0].id;
        }
      } catch (error) {
        console.error("Failed to fetch initial videos", error);
      }
    };

    fetchInitialVideos();
  }, [SEVER_URL]);


  // 다음 클립 불러오기(아래)
  const fetchNextClip = async () => {
    console.log("next");
    if (!currentClipId) return;
    try {
      const response = await axiosInstance.get(`/clip/list_rev`, {
        params: {
          clipId: currentClipId,
          pageSize: 1,
          liveId: null,
        }
      });
      if (response.data.length > 0) {
        setVideos((prevVideos) => [...prevVideos, ...response.data]);
        currentClipIdRef.current = response.data[0].id; // 최신 값 갱신
      }
    } catch (error) {
      console.error("Failed to fetch previous clip", error);
    }
  };

  // 이전 클립 불러오기(위)
  const fetchPreviousClip = async () => {
    console.log("prev");
    if (!currentClipId) return;
    try {
      const response = await axiosInstance.get(`/clip/list`, {
        params: {
          clipId: currentClipId,
          pageSize: 1,
          liveId: null,
        }
      });
      if (response.data.length > 0) {
        setVideos((prevVideos) => [response.data[0], ...prevVideos]);
        currentClipIdRef.current = response.data[0].id; // 최신 값 갱신
      }
    } catch (error) {
      console.error("Failed to fetch next clip", error);
    }
  };

  // 슬라이드 변경 시 비디오 자동 재생
  useEffect(() => {
    if (videoRefs.current.length > 0) {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.play();
        }
      });
    }
  }, [videos]);

  // const handleSlideChange = (swiper: any) => {
  //   videoRefs.current.forEach((video, index) => {
  //     if (index === swiper.realIndex) {
  //       video.currentTime = 0; // 처음으로 이동
  //       video.play(); // 재생
  //     } else {
  //       video.pause(); // 정지
  //       video.currentTime = 0; // 처음으로 이동
  //     }
  //   });

  //   prevIndex.current = swiper.realIndex; // 현재 슬라이드 인덱스 업데이트
  // };

  // 0 <-> 2 이동 시 play()가 실행되지 않는 문제 해결
  // const handleTransitionEnd = (swiper: any) => {
  //   if (
  //     (prevIndex.current === 2 && swiper.realIndex === 0) ||
  //     (prevIndex.current === 0 && swiper.realIndex === 2)
  //   ) {
  //     setTimeout(() => {
  //       const video = videoRefs.current[swiper.realIndex];
  //       if (video) {
  //         video.currentTime = 0;
  //         video.play();
  //       }
  //     }, 100); // Swiper가 슬라이드를 변경하는 타이밍을 맞추기 위해 지연
  //   }
  // };

  return (
    <VideoClipPageWrapper>
      <T1>Video Clip</T1>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={
          true
        }
        pagination={{
          clickable: true,
        }}
        onSlideNextTransitionStart={fetchNextClip} // 아래로 스크롤 -> 이전 클립
        onSlidePrevTransitionStart={fetchPreviousClip} // 위로 스크롤 -> 다음 클립
        modules={[Mousewheel]}
        className="mySwiper"
        style={{
          aspectRatio: 16 / 10,
          backgroundColor: "beige",
        }}
      >
        {videos.map((video, idx) => (
          <SwiperSlide key={idx}>
            <VideoPlayer
              ref={(el) => (videoRefs.current[idx] = el!)}
              src={video.videoUrl}
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
