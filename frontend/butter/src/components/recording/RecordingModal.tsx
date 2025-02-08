import React from "react";
import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    opacity: 0.7;
  }
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

const DownLoadButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const RecordingModal: React.FC<RecordingModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
}) => {
  if (!isOpen) return null;
  const handleDownload = async () => {
    // 다운로드할 파일 URL (여기에 실제 URL을 입력하세요)
    const url = videoUrl;

    try {
      // fetch를 이용해 파일 데이터 가져오기
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`네트워크 응답 문제: ${response.statusText}`);
      }

      // Blob으로 변환 (비디오 파일)
      const blob = await response.blob();

      // 임시 URL 생성
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "test-recording.mp4"; // 저장될 파일명 지정

      // 링크를 클릭하여 다운로드 트리거
      document.body.appendChild(link);
      link.click();

      // 임시로 추가한 링크 제거 및 URL 해제
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("파일 다운로드 중 에러 발생:", error);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <VideoPlayer src={videoUrl} controls autoPlay />
        <DownLoadButton onClick={handleDownload}>Download Video</DownLoadButton>
      </ModalContent>
    </ModalOverlay>
  );
};
