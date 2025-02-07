import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useRef } from "react";

const UserBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface VideoStreamProps {
  streamInterval?: number; //스트리밍 간격(ms)
}

const UserBox = ({ streamInterval = 200 }: VideoStreamProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<MediaStream | null>(null);

  const sendFrameToServer = async () => {
    if (!videoRef.current) return;

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context?.drawImage(videoRef.current, 0, 0);
      console.log("서버로 보내기 전");
      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append("file", blob, "useFrame.jpg");
            const serverUrl = "https://192.168.30.201:5000/ai/upload_frame";
            const res = await axios.post(serverUrl, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log("서버 응답", res.data);
          }
        },
        "image/jpeg",
        0.95
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.message);
        console.error("Error Config:", err.config);
        if (err.response) {
          console.error("Error Response:", err.response.data);
        }
      }
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
            userVideoRef.current = stream;

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
