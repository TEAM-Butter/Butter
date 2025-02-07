import styled from "@emotion/styled";
import { useCallback, useEffect, useRef } from "react";

const UserBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface VideoStreamProps {
  streamInterval?: number; //스트리밍 간격(ms)
}

const UserBox = ({ streamInterval = 200 }: VideoStreamProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // const sendFrameToServer = useCallback(async () => {
  //   if (!videoRef.current) return;

  //   try {
  //     const canvas = document.createElement("canvas");
  //     const context = canvas.getContext("2d");

  //     canvas.width = videoRef.current.videoWidth;
  //     canvas.height = videoRef.current.videoHeight;

  //     context?.drawImage(videoRef.current, 0, 0);
  //     console.log("서버로 보내기 전");
  //     canvas.toBlob(
  //       async (blob) => {
  //         if (blob) {
  //           const formData = new FormData();
  //           formData.append("file", blob);
  //           const serverUrl = "/ai/upload_frame";

  //           try {
  //             const response = await fetch(serverUrl, {
  //               method: "POST",
  //               body: formData,
  //               // mode: "cors",
  //               // credentials: "omit", // 추가
  //               headers: {
  //                 Accept: "application/json",
  //                 // Origin: window.location.origin, // 추가
  //               },
  //             });
  //             if (!response.ok) {
  //               throw new Error(`HTTP error! status: ${response.status}`);
  //             }

  //             const data = await response.json();
  //             console.log("서버 응답:", data);
  //           } catch (error) {
  //             if (
  //               error instanceof TypeError &&
  //               error.message === "Failed to fetch"
  //             ) {
  //               console.error(
  //                 "서버 연결 실패. 서버가 실행 중인지 확인해주세요.",
  //                 {
  //                   error,
  //                   url: serverUrl,
  //                   origin: window.location.origin,
  //                 }
  //               );
  //             } else {
  //               console.error("전송 오류:", error);
  //             }
  //           }
  //         }
  //       },
  //       "image/jpeg",
  //       0.95
  //     );
  //   } catch (err) {
  //     console.error("프레임 캡처 중 오류:", err);
  //   }
  // }, []);
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
            const formData = new FormData();
            formData.append("file", blob);

            // 디버깅을 위한 로그 추가
            console.log("Sending request to:", "/ai/upload_frame");

            try {
              const response = await fetch("/ai/upload_frame", {
                method: "POST",
                body: formData,
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
