import React, {useState} from "react";
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

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SaveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

const DownLoadButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

interface ClipModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  recordingName: string;
}

export const ClipModal: React.FC<ClipModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  recordingName,
}) => {
  const [title, setTitle] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      alert("제목을 입력해 주세요!");
      return;
    }

    const SERVER_URL = import.meta.env.VITE_NODE_JS_SERVER || ""; // NodeJS 서버 URL

    try {
      const response = await fetch(`${SERVER_URL}/clip/save/${title}/${recordingName}`, {
        method: "GET", // 클립 저장을 위해 GET 요청
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ 클립 저장 성공: ${data.recordingName}`);
        onClose(); // 모달 닫기
      } else {
        console.error("❌ 클립 저장 실패:", data.errorMessage);
        alert(`클립 저장 실패: ${data.errorMessage}`);
      }
    } catch (error) {
      console.error("🚨 서버 오류 발생:", error);
      alert("서버 오류 발생");
    }
  };


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
        <h2>편집된 영상</h2>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <VideoPlayer src={videoUrl} controls autoPlay />
        <Input
          type="text"
          placeholder="영상 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ButtonContainer>
          <SaveButton onClick={handleSave}>저장</SaveButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <DownLoadButton onClick={handleDownload}>Download Video</DownLoadButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};
