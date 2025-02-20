import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../apis/axiosInstance";
import redHeart from "../../assets/redheart.png";
import whiteHeart from "../../assets/whiteheart.png";
const VideoClipPageWrapper = styled.div`
  max-width: 2000px;
  width: 90%;
  display: flex;
  flex-direction: column;
  /* height: 90%; */
  margin: auto;
  padding-top: 15px; // 하나로 통일
  overflow: hidden; // 추가
`;

const T1 = styled.div`
  margin: 10px;
  font-size: 100px;
  font-weight: bold;
`;

const T2 = styled.div`
  font-size: 20px;
  margin: 5px;
  margin-bottom: 15px;
  margin-left: 30px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  //
`;

const HeartButton = styled.button`
  position: absolute;
  display: flex;

  bottom: 20px;
  left: 20px;
  background-color: #0e0e0e1b;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 30px;
  cursor: pointer;
  z-index: 10;
`;

const VideoWrapper = styled.div`
  display: flex;
`;
const NoContentBox = styled.div`
  font-size: 25px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const NoContentContext = styled.div`
  font-size: 20px;
  padding: 25px;
  padding-left: 70px;
  padding-right: 70px;
  border-radius: 20px;
  background-color: rgba(1, 1, 1, 0.317);
`;
const LikeCountSpan = styled.div`
  margin-left: 8px;
  font-size: 30px;
`;
const Heart = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  margin-left: 5px;
  /* align-items: center; */
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
  const prevIndex = useRef<number>(0);

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
        console.error("Error details:", {
          error,
        });
      }
    };

    fetchInitialVideos();
  }, [SEVER_URL]);

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
      <T2>버스킹의 뜨거운 순간, 함께 느껴보세요</T2>
      {videos.length === 0 ? (
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
          loop={true}
          pagination={{
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          onTransitionEnd={handleTransitionEnd}
          modules={[Mousewheel]}
          className="mySwiper"
          style={{
            aspectRatio: 16 / 8.8,
            backgroundColor: "#0a0a0b84",
            width: "80%",
          }}
        >
          {videos.map((video, idx) => (
            <SwiperSlide key={`${video.id}-${idx}`}>
              <VideoWrapper>
                <VideoPlayer
                  ref={(el) => (videoRefs.current[idx] = el!)}
                  key={`${video.id}-${idx}`}
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
                  {video.isLiked ? (
                    <Heart src={redHeart} />
                  ) : (
                    <Heart src={whiteHeart} />
                  )}
                </HeartButton>
              </VideoWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </VideoClipPageWrapper>
  );
};

export default VideoClipPage;
