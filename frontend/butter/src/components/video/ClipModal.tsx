import React, { useState } from "react";
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
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const SaveButton = styled(Button)`
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  padding: 10px 20px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const DownLoadButton = styled(Button)`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  //  background-color: #4caf50;
`;

const ListButton = styled(Button)`
  padding: 10px 20px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  padding: 10px 20px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const RightButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

interface ClipModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  clipName: string;
}

export const ClipModal: React.FC<ClipModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  clipName,
}) => {
  const [title, setTitle] = useState("");
  const SERVER_URL = import.meta.env.VITE_NODE_JS_SERVER || "";

  const handleSave = async () => {
    if (!title.trim()) {
      alert("제목을 입력해 주세요!");
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/clip/${title}/${clipName}`, {
        method: "GET", // 클립 저장을 위해 GET 요청
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ 클립 저장 성공: ${data.clipName}`);
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

  const listClip = async () => {
    try {
      let crewId = clipName.split("-")[0];
      const response = await fetch(`${SERVER_URL}/clip/${crewId}`, {
        method: "GET", // 클립 저장을 위해 GET 요청
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        console.error("❌ 클립 리스트 실패:", data.errorMessage);
        alert(`클립 리스트 실패: ${data.errorMessage}`);
      }
    } catch (error) {
      console.error("🚨 서버 오류 발생:", error);
      alert("서버 오류 발생");
    }
  };

  const deleteClip = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/clip/${clipName}`, {
        method: "DELETE", // 클립 저장을 위해 GET 요청
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        console.error("❌ 클립 삭제 실패:", data.errorMessage);
        alert(`클립 삭제 실패: ${data.errorMessage}`);
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
          <DownLoadButton onClick={handleDownload}>
            Download Video
          </DownLoadButton>
          <RightButtonGroup>
            <SaveButton onClick={handleSave}>저장</SaveButton>
            <CancelButton onClick={onClose}>취소</CancelButton>
          </RightButtonGroup>
        </ButtonContainer>
        <ButtonContainer>
          <ListButton onClick={listClip}>리스트</ListButton>
          <DeleteButton onClick={deleteClip}>삭제</DeleteButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};
