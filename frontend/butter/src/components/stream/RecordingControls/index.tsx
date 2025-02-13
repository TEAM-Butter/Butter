import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { RecordingService } from "../../recording/RecordingService";

// 상태 타입을 명확히 정의
type RecordingStatus = "STOPPED" | "STARTED" | "STARTING" | "STOPPING";

const ControlsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const RecordButton = styled.button<{ isRecording?: boolean }>`
  background-color: ${(props) => (props.isRecording ? "#ea2323" : "#4CAF50")};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const StatusIndicator = styled.div<{ status: RecordingStatus }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${(props) => {
    switch (props.status) {
      case "STARTED":
        return "#4CAF50";
      case "STOPPED":
        return "#666666";
      case "STARTING":
      case "STOPPING":
        return "#FFA500";
      default:
        return "#666666";
    }
  }};
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  padding: 8px;
  background-color: #fff3f3;
  border-radius: 4px;
  margin-top: 8px;
`;

interface Props {
  recordingService: RecordingService;
  onRecordingStateChange?: (isRecording: boolean) => void;
}

export const RecordingControls: React.FC<Props> = ({
  recordingService,
  onRecordingStateChange,
}) => {
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatus>("STOPPED");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // 상태 변경 시 부모 컴포넌트에 알림
  const updateRecordingState = useCallback(
    (status: RecordingStatus) => {
      setRecordingStatus(status);
      if (onRecordingStateChange) {
        onRecordingStateChange(status === "STARTED");
      }
    },
    [onRecordingStateChange]
  );

  // useCallback으로 핸들러 메모이제이션
  const handleStartRecording = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log("ccaqll");
    setRecordingStatus("STARTING");

    try {
      console.log("start");
      await recordingService.startRecording();
      console.log("start end");
      setRecordingStatus("STARTED");
      updateRecordingState("STARTED");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to start recording";
      setError(errorMessage);
      setRecordingStatus("STOPPED");
      updateRecordingState("STOPPED");
    } finally {
      setIsLoading(false);
    }
  }, [recordingService, updateRecordingState]);

  const handleStopRecording = useCallback(async () => {
    if (recordingStatus !== "STARTED") {
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecordingStatus("STOPPING");

    try {
      await recordingService.stopRecording();
      setRecordingStatus("STOPPED");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to stop recording";
      setError(errorMessage);
      // 에러 발생시 이전 상태로 복구
      setRecordingStatus("STARTED");
    } finally {
      setIsLoading(false);
    }
  }, [recordingService, recordingStatus]);

  useEffect(() => {
    // 초기 상태 설정
    const initialStatus: RecordingStatus =
      recordingService.isRecordingInProgress() ? "STARTED" : "STOPPED";
    setRecordingStatus(initialStatus);
    updateRecordingState(initialStatus);

    // 녹화 상태 변경 리스너
    // const unsubscribe = recordingService.listenToRecordingStatus((status) => {
    //   setRecordingStatus(status as RecordingStatus);
    //   setError(null);
    // });

    // cleanup 함수
    // return () => {
    //   if (unsubscribe) {
    //     unsubscribe();
    //   }
    // };
  }, [recordingService]);

  // 버튼 상태 계산
  const isStartButtonDisabled =
    isLoading ||
    recordingStatus === "STARTING" ||
    recordingStatus === "STARTED";

  const isStopButtonDisabled =
    isLoading ||
    recordingStatus === "STOPPING" ||
    recordingStatus === "STOPPED";

  return (
    <ControlsWrapper>
      <ButtonWrapper>
        {recordingStatus === "STOPPED" ? (
          <RecordButton
            onClick={handleStartRecording}
            disabled={isStartButtonDisabled}
          >
            {isLoading ? "Starting..." : "Start Recording"}
          </RecordButton>
        ) : (
          <RecordButton
            onClick={handleStopRecording}
            disabled={isStopButtonDisabled}
            isRecording
          >
            {isLoading ? "Stopping..." : "Stop Recording"}
          </RecordButton>
        )}
        <StatusIndicator status={recordingStatus}>
          {recordingStatus === "STARTED" && (
            <span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#4CAF50",
                borderRadius: "50%",
                animation: "pulse 1.5s infinite",
              }}
            />
          )}
          {recordingStatus}
        </StatusIndicator>
      </ButtonWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ControlsWrapper>
  );
};
