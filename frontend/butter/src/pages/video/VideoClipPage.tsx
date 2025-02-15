import styled from "@emotion/styled";
import { FC, useEffect, useRef, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const VideoClipPageWrapper = styled.div`
  position: relative; // 추가
  display: flex;
  flex-direction: column; // 수정
  max-width: 2000px;
  margin: auto;
  padding-top: 15px; // 하나로 통일
  height: 100vh; // 90vh에서 수정
  width: 100%; // 90vw에서 수정
  overflow: hidden; // 추가
`;
const VideoListContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 140px); // T1의 height + margin-bottom을 고려
  overflow: hidden;
`;

const VideoContainer = styled.div<{ isActive: boolean; isPrevious: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  transition: transform 300ms;
  transform: translateY(
    ${({ isActive, isPrevious }) =>
      isActive ? "0" : isPrevious ? "-100%" : "100%"}
  );
`;

// 추가적인 styled components
const VideoElement = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const VideoInfo = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
`;

const VideoTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

const NavigationControls = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavButton = styled.button<{ disabled: boolean }>`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:disabled {
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Spinner = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const VideoErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 0.5rem;
`;
const T1 = styled.div`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 20px;
`;

interface Video {
  id: string;
  url: string;
  title: string;
}

interface ShortsPlayerProps {
  initialVideos: Video[];
  onLoadMore: () => Promise<Video[]>;
}

const VideoClipPage = ({ initialVideos, onLoadMore }: ShortsPlayerProps) => {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const touchStartY = useRef<number>(0);

  // 비디오 전환 처리 (하나로 통합)
  const handleScroll = (direction: "up" | "down") => {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < videos.length) {
      setCurrentIndex(newIndex);
    }
  };
  // 키보드 네비게이션 (별도의 useEffect로 분리)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        handleScroll("up");
      } else if (e.key === "ArrowDown") {
        handleScroll("down");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, videos.length]);

  // 무한 스크롤 처리
  useEffect(() => {
    const loadMoreVideos = async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setLoading(true);
        try {
          const newVideos = await onLoadMore();
          setVideos((prev) => [...prev, ...newVideos]);
        } catch (error) {
          console.error("Failed to load more videos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    observerRef.current = new IntersectionObserver(loadMoreVideos, {
      threshold: 0.5,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, onLoadMore]);

  // 마지막 비디오 관찰
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const videoElements = container.querySelectorAll(
        "[data-video-container]"
      );
      const lastVideo = videoElements[videoElements.length - 1];

      if (lastVideo && observerRef.current) {
        observerRef.current.observe(lastVideo);
      }
    }
  }, [videos]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      handleScroll(diff > 0 ? "down" : "up");
    }
  };

  return (
    <VideoClipPageWrapper>
      <T1>Video Clip</T1>
      <VideoListContainer
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {videos.map((video, index) => (
          <VideoContainer
            key={video.id}
            id={`video-${index}`}
            data-video-container
            isActive={index === currentIndex}
            isPrevious={index < currentIndex}
          >
            <VideoElement
              src={video.url}
              loop
              playsInline
              autoPlay={index === currentIndex}
              muted={index !== currentIndex}
              onError={() => setVideoError(true)}
            >
              <source src={video.url} type="video/mp4" />
            </VideoElement>
            <VideoInfo>
              <VideoTitle>{video.title}</VideoTitle>
            </VideoInfo>
            {videoError && (
              <VideoErrorMessage>
                비디오를 불러오는데 실패했습니다.
              </VideoErrorMessage>
            )}
          </VideoContainer>
        ))}
      </VideoListContainer>

      <NavigationControls>
        <NavButton
          onClick={() => handleScroll("up")}
          disabled={currentIndex === 0}
        >
          <KeyboardArrowUpIcon />
        </NavButton>
        <NavButton
          onClick={() => handleScroll("down")}
          disabled={currentIndex === videos.length - 1}
        >
          <KeyboardArrowDownIcon />
        </NavButton>
      </NavigationControls>

      {loading && (
        <LoadingIndicator>
          <Spinner />
        </LoadingIndicator>
      )}
    </VideoClipPageWrapper>
  );
};

export default VideoClipPage;
