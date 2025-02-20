import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import { useEffect, useRef } from "react";
import "./index.css";

interface StreamLiveVideoProps {
  track: LocalVideoTrack | RemoteVideoTrack;
  participantIdentity: string;
  local?: boolean;
  roomName: string;
  role: string;
  fakeTitle: string;
  avatarType: string | null;
}

function StreamLiveVideo({
  track,
  participantIdentity,
  roomName,
  fakeTitle,
  role,
  avatarType,
  local = false, // local 속성 추가
}: StreamLiveVideoProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const streamInterval = 500; // 200ms 간격으로 프레임 전송
  const thumbnailInterval = 30000;
  const sendFrameToServer = async () => {
    if (!videoElement.current || !local) return;

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoElement.current.videoWidth;
      canvas.height = videoElement.current.videoHeight;

      context?.drawImage(videoElement.current, 0, 0);
      //Websocket연결 형성할 때 본인이 시청자인지 크루인지 정보.

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const formData = new FormData();
            console.log("streamer의 영상을 서버로 보냅니다");
            formData.append("file", blob);

            // 참가자 정보와 룸 정보도 함께 전송
            formData.append("participant", participantIdentity);
            //수정
            formData.append("role", role);
            formData.append("room-id", roomName);
            formData.append("avatarType", avatarType ? avatarType : "");

            const serverUrl = `${
              import.meta.env.VITE_FLASK_SERVER
            }/ai/upload_frame`;

            // const agent = new https.Agent({
            //   rejectUnauthorized: false,
            // });

            try {
              const response = await fetch(serverUrl, {
                method: "POST",
                body: formData,
                mode: "cors",
                headers: {
                  Accept: "application/json",
                },
              });

              if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                  const errorData = await response.json();
                  errorMessage += ` - ${JSON.stringify(errorData)}`;
                } catch (jsonError) {
                  console.warn(
                    "서버 응답을 JSON으로 변환할 수 없음:",
                    jsonError
                  );
                }
                throw new Error(errorMessage);
              }
            } catch (error) {
              if (error instanceof Error) {
                console.error("전송 오류 발생:", error);
                console.error("에러 메시지:", error.message);
                console.error("에러 스택:", error.stack);
              }
              // if (
              //   error instanceof TypeError &&
              //   error.message === "Failed to fetch"
              // ) {
              //   console.error(
              //     "서버 연결 실패. 서버가 실행 중인지 확인해주세요."
              //   );
              //   console.log(error);
              // } else {
              //   console.error("전송 오류:", error);
              // }
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
  const sendThumbnailToServer = async () => {
    if (!videoElement.current || !local) return;

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = videoElement.current.videoWidth;
      canvas.height = videoElement.current.videoHeight;

      context?.drawImage(videoElement.current, 0, 0);

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const formData = new FormData();
            // thumbnail이라는 이름으로 blob 추가
            const file = new File([blob], "thumbnail.jpg", {
              type: "image/jpeg",
            });
            formData.append("thumbnail", file);
            console.log("🤣🤣🤣🤣🤣🤣", file);
            console.log("🤣🤣🤣🤣🤣🤣formData", formData);
            const springServerUrl = `${
              import.meta.env.VITE_SPRING_BOOT_SERVER
            }/v1/live/${Number(roomName)}/thumbnail`;

            const accessToken = localStorage.getItem("accessToken");

            console.log("Final URL:", springServerUrl);

            console.log("Request URL:", springServerUrl);
            console.log("Room Name:", roomName);
            console.log("Room ID (converted):", Number(roomName));
            // FormData 내용 확인
            for (let pair of formData.entries()) {
              console.log("FormData:", pair[0], pair[1]);
            }
            if (!accessToken) {
              console.error("No access token found");
              return;
            }

            try {
              console.log("Sending request to:", springServerUrl);
              console.log("Sending request with config:", {
                url: springServerUrl,
                method: "PUT",
                mode: "cors",
                headers: {
                  Accept: "application/json",
                },
              });
              const response = await fetch(springServerUrl, {
                method: "PUT",
                body: formData,
                mode: "cors",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
              });
              console.log("Response status:", response.status);
              console.log(
                "Response headers:",
                Object.fromEntries(response.headers)
              );

              if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                const contentType = response.headers.get("content-type");

                // 응답 내용 확인 시도
                const responseText = await response.text();
                console.log("Raw response:", responseText);

                if (
                  contentType &&
                  contentType.includes("application/json") &&
                  responseText
                ) {
                  try {
                    const errorData = JSON.parse(responseText);
                    errorMessage += ` - ${JSON.stringify(errorData)}`;
                  } catch (jsonError) {
                    console.warn("JSON 파싱 실패:", jsonError);
                    errorMessage += ` - Raw response: ${responseText}`;
                  }
                } else {
                  errorMessage += ` - ${responseText || "No response body"}`;
                }

                throw new Error(errorMessage);
              }

              console.log("Thumbnail successfully sent");
            } catch (error) {
              if (error instanceof Error) {
                console.error("전송 오류 발생:", error);
                console.error("에러 메시지:", error.message);
                console.error("에러 스택:", error.stack);

                // 네트워크 오류인 경우
                if (
                  error.name === "TypeError" &&
                  error.message === "Failed to fetch"
                ) {
                  console.error(
                    "서버 연결 실패. 서버 URL 확인 필요:",
                    springServerUrl
                  );
                }
              }
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
    if (videoElement.current) {
      track.attach(videoElement.current);
      const intervalId = local
        ? setInterval(sendFrameToServer, streamInterval)
        : null;
      return () => {
        if (intervalId) clearInterval(intervalId);
        track.detach();
      };
    }

    return () => {
      track.detach();
    };
  }, [track, streamInterval, local]);

  useEffect(() => {
    if (videoElement.current) {
      track.attach(videoElement.current);

      if (local) {
        sendThumbnailToServer();
      }

      const intervalId = local
        ? setInterval(sendThumbnailToServer, thumbnailInterval)
        : null;
      return () => {
        if (intervalId) clearInterval(intervalId);
        track.detach();
      };
    }

    return () => {
      track.detach();
    };
  }, [track, thumbnailInterval, local]);

  return (
    <div id={"camera-" + participantIdentity} className="video-container">
      <div className="participant-data">
        <p>{fakeTitle}</p>
        <p>{participantIdentity}</p>
      </div>
      <video ref={videoElement} id={track.sid}></video>
    </div>
  );
}

export default StreamLiveVideo;
