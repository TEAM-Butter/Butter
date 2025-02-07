import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const UserBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const UserBox = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const constraints = { video: true };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            //비디오 엘리먼트에 스트림을 연결
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.log("카메라 접근 중 오류가 발생했습니다.", error);
        });
    } else {
      console.log("getUserMedia가 이 브라우저에서 지원되지 않습니다.");
    }
  }, []);

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
