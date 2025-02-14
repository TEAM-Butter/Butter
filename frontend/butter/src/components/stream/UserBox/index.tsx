import styled from "@emotion/styled";
import { useCallback, useEffect, useRef } from "react";

const UserBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface VideoStreamProps {
  streamInterval?: number; //스트리밍 간격(ms)
  participantName: string;
  roomName: string;
  role: string;
}

// interface UserBoxProps {
//   participantName: string;
//   roomName: string;
// }

const UserBox = ({
  streamInterval = 500,
  participantName,
  roomName,
  role,
}: VideoStreamProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const sendFrameToServer = async () => {
    if (!videoRef.current) return;

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context?.drawImage(videoRef.current, 0, 0);

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            console.log("유저의 이미지를 서버로 보냅니다");
            const formData = new FormData();
            formData.append("file", blob);
            // 참가자 정보와 룸 정보도 함께 전송
            formData.append("participant", participantName);
            console.log("participant이름", participantName);
            //수정
            formData.append("room-id", roomName);
            formData.append("role", role);

            // 디버깅을 위한 로그 추가
            console.log("Sending request to:", "/ai/upload_frame");

            const serverUrl = "http://localhost:5000/ai/upload_frame";

            try {
              const response = await fetch(serverUrl, {
                method: "POST",
                body: formData,
                mode: "cors",
                headers: {
                  Accept: "application/json",
                },
              });

              console.log("Response status:", response.status);

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();
              console.log("서버 응답:", data);
            } catch (error) {
              console.error("전송 오류:", error);
            }
          }
        },
        "image/jpeg",
        0.95
      );
    } catch (err) {
      console.error("프레임 캡처 중 오류:", err);
    }
  };
  useEffect(() => {
    const constraints = { video: true, audio: false };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            //비디오 엘리먼트에 스트림을 연결
            videoRef.current.srcObject = stream;

            //  스트림이 시작되면 주기적으로 프레임 전송 시작
            const intervalId = setInterval(sendFrameToServer, streamInterval);

            //cleanup 함수 반환
            return () => {
              clearInterval(intervalId);
              stream.getTracks().forEach((track) => track.stop());
            };
          }
        })
        .catch((error) => {
          console.log("카메라 접근 중 오류가 발생했습니다.", error);
          console.log("카메라 접근 권한을 얻지 못했습니다다");
        });
    } else {
      console.log("getUserMedia가 이 브라우저에서 지원되지 않습니다.");
    }
  }, [streamInterval]);

  return (
    <UserBoxWrapper>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%" }}
      />
    </UserBoxWrapper>
  );
};

export default UserBox;
