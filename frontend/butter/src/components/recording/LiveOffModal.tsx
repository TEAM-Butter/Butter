import React from "react";
import styled from "@emotion/styled";
import { RecordingList } from "./RecordingList";
import { Recording } from "./types";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
`;
const Title2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: black;
`;

const ListContainer = styled.div`
  margin: 20px 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Button = styled.button<{ isConfirm?: boolean }>`
  padding: 12px 40px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  ${({ isConfirm }) =>
    isConfirm
      ? `
    background-color: #ea2323;
    color: white;
  `
      : `
    background-color: #f5f5f5;
    color: #333;
  `}
`;

interface LiveOffModalProps {
  isOpen: boolean;
  recordings: Recording[];
  onClose: () => void;
  onConfirm: () => void;
  onPlay: (recordingName: string) => void;
  onDelete: (recordingName: string) => void;
}

export const LiveOffModal: React.FC<LiveOffModalProps> = ({
  isOpen,
  recordings,
  onClose,
  onConfirm,
  onPlay,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>정말로 종료하시겠습니까?</Title>
        <ListContainer>
          <Title2>Recordings</Title2>
          <RecordingList
            recordings={recordings}
            onPlay={onPlay}
            onDelete={onDelete}
          />
        </ListContainer>
        <ButtonContainer>
          <Button onClick={onClose}>아니요</Button>
          <Button isConfirm onClick={onConfirm}>
            예
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};
