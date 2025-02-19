import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../apis/axiosInstance";
import { div } from "framer-motion/client";

const VideoClipPageWrapper = styled.div`
  max-width: 2000px;
  width: 90%;
  height: 90%;
  margin: auto;
  padding-top: 15px; // 하나로 통일
  overflow: hidden; // 추가
`;

const T1 = styled.div`
  margin: 20px;
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 20x;
`;

const T2 = styled.div`
  font-size: 25px;
  margin: 10px;
  margin-left: 30px;
`;

const VideoPlayer = styled.video`
  width: 100%;
`;

const HeartButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
  z-index: 10;
`;

const NoContentBox = styled.div`
  font-size: 25px;
  margin: 10px;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const NoContentContext = styled.div`
  font-size: 30px;
  padding: 25px;
  padding-left: 70px;
  padding-right: 70px;
  border-radius: 20px;
  background-color: rgba(1, 1, 1, 0.317);
`;
const LikeCountSpan = styled.span`
  margin-left: 8px;
  font-size: 40px;
`;

interface Video {
  id: string; // 녹화 ID
  crewId: number; // 녹화된 크루 ID
  title: string; // 녹화 파일 이름
  videoName: string; // 녹화 파일 이름
  videoUrl: string; // 녹화 파일 이름
  hitCount: number; // 조회수
  isLiked: boolean;
  likeCount: number;
}

const PAGE_SIZE = 10;

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
        const response = await axiosInstance.get(`/clip/list`, {
          params: {
            clipId: null,
            pageSize: PAGE_SIZE,
            liveId: null,
          },
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
    if (!currentClipIdRef.current) return;
    try {
      const response = await axiosInstance.get(`/clip/list`, {
        params: {
          clipId: currentClipIdRef.current,
          pageSize: PAGE_SIZE,
          liveId: null,
        },
      });
      if (response.data.length > 0) {
        setVideos((prevVideos) => {
          // 이미 있는 clipId를 가진 클립은 제거
          const newVideos = response.data.filter(
            (video: Video) => !prevVideos.some((v) => v.id === video.id)
          );
          return [...prevVideos, ...newVideos];
        });
        const newCurrentId = response.data[response.data.length - 1].id;
        setCurrentClipId(newCurrentId);
        currentClipIdRef.current = newCurrentId;
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
      const response = await axiosInstance.get(`/clip/list_rev`, {
        params: {
          clipId: currentClipId,
          pageSize: PAGE_SIZE,
          liveId: null,
        },
      });
      if (response.data.length > 0) {
        setVideos((prevVideos) => {
          // 이미 있는 clipId를 가진 클립은 제거
          const newVideos = response.data.filter(
            (video: Video) => !prevVideos.some((v) => v.id === video.id)
          );
          return [...prevVideos, ...newVideos];
        });
        const newCurrentId = response.data[0].id;
        setCurrentClipId(newCurrentId);
        currentClipIdRef.current = newCurrentId;
      }
    } catch (error) {
      console.error("Failed to fetch next clip", error);
    }
  };

  // 찜하기 버튼 토글 함수
  const toggleLike = async (videoId: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === videoId) {
          const newLiked = !video.isLiked;
          const newCount = newLiked ? video.likeCount + 1 : video.likeCount - 1;
          // API 호출: 새로 좋아요 등록하는 경우 POST, 취소하는 경우 DELETE 요청
          if (newLiked) {
            axiosInstance
              .post("/clip/like", { clipId: video.id })
              .catch((err) => console.error("Failed to like video", err));
          } else {
            axiosInstance
              .delete(`/clip/like/${video.id}`)
              .catch((err) => console.error("Failed to unlike video", err));
          }
          return { ...video, isLiked: newLiked, likeCount: newCount };
        }
        return video;
      })
    );
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

  const handleSlideChange = (swiper: any) => {
    console.log("Slide changed. Active index:", swiper.activeIndex);
    const activeSlide = videoRefs.current[swiper.activeIndex];
    if (activeSlide) {
      activeSlide.currentTime = 0;
      activeSlide.play();
    }
  };

  return (
    <VideoClipPageWrapper>
      <T1>Video Clip</T1>
      <T2>버스킹의 뜨거운 순간, 함께 느껴보세요</T2>
      {videos ? (
        <NoContentBox>
          <NoContentContext>
            아직 등록된 클립이 없습니다. 첫 번째 버스킹 영상의 주인공이
            되어보세요!
          </NoContentContext>
        </NoContentBox>
      ) : (
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          onSlideNextTransitionStart={fetchNextClip} // 아래로 스크롤 -> 이전 클립
          onSlidePrevTransitionStart={fetchPreviousClip} // 위로 스크롤 -> 다음 클립
          onSlideChange={handleSlideChange}
          modules={[Mousewheel]}
          className="mySwiper"
          style={{
            aspectRatio: 16 / 10,
            backgroundColor: "beige",
          }}
        >
          {videos.map((video, idx) => (
            <SwiperSlide key={`${video.id}-${idx}`}>
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
              <HeartButton onClick={() => toggleLike(video.id)}>
                <LikeCountSpan>{video.likeCount}</LikeCountSpan>
                {video.isLiked ? "❤️" : "🤍"}
              </HeartButton>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </VideoClipPageWrapper>
  );
};

export default VideoClipPage;
