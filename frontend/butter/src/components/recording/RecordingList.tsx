import React from "react";
import styled from "@emotion/styled";
import { Recording } from "./types";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RecordingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  color: black;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecordingInfo = styled.div`
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
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

const PlayButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #ea2323;
  color: white;
`;

interface RecordingListProps {
  recordings: Recording[];
  onPlay: (recordingName: string) => void;
  onDelete: (recordingName: string) => void;
}

export const RecordingList: React.FC<RecordingListProps> = ({
  recordings,
  onPlay,
  onDelete,
}) => {
  if (recordings.length === 0) {
    return <div>No recordings available</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <ListContainer>
      {recordings.map((recording) => (
        <RecordingItem key={recording.name}>
          <RecordingInfo>
            <h3>{recording.name}</h3>
            <p>{formatDate(recording.startedAt)}</p>
          </RecordingInfo>
          <ButtonGroup>
            <PlayButton onClick={() => onPlay(recording.name)}>Play</PlayButton>
            <DeleteButton onClick={() => onDelete(recording.name)}>
              Delete
            </DeleteButton>
          </ButtonGroup>
        </RecordingItem>
      ))}
    </ListContainer>
  );
};
