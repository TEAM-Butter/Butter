import styled from "@emotion/styled";
import StreamChat from "../../components/stream/StreamChat";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from "livekit-client";
import StreamLive from "../../components/stream/StreamLive";
import { RecordingControls } from "../../components/stream/RecordingControls";
import { useLocation, useNavigate } from "react-router-dom";
// import { RecordingManager } from "../../components/recording/RecordingManger";

import { RecordingService } from "../../components/recording/RecordingService";
import { LiveOffModal } from "../../components/recording/LiveOffModal";
import { RecordingModal } from "../../components/recording/RecordingModal";
import { Recording } from "../../types/recording";
import UserBox from "../../components/stream/UserBox";

import background from "../../assets/background.png";
import CharacterContainer from "../../components/stream/CharacterContainer";
import { io } from "socket.io-client";

import { useUserStore } from "../../stores/UserStore";
import { useCrewStore } from "../../stores/UserStore";
import { axiosInstance } from "../../apis/axiosInstance";

const LivePageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  max-width: 1300px;
  max-height: 1000px;
  margin: 0 auto;
  padding-top: 15px;
  height: 90vh;
  width: 90vw;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  /* max-height: 800px; */
  min-width: 200px;
`;

const Right = styled.div`
  width: 350px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 8px;
  height: calc(100% - 8px);

  @media (max-width: 780px) {
    width: 100%;
    min-width: 100%;
    height: auto;
    /* 컨테이너 내부 요소들의 배치 변경 */
    flex-direction: row; /* 가로 배치로 변경 */
    flex-wrap: wrap; /* 필요시 줄바꿈 */
    gap: 8px; /* 간격 균일하게 */
  }
`;

const LeftTop = styled.div`
  background-color: gray;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9; // 16:9 비율 설정

  @media (max-width: 780px) {
    width: 100%;
    aspect-ratio: 16 / 9; // 모바일에서도 같은 비율 유지
  }
`;

// const CharacterBox = styled.div`
//   /* flex: 1.6; */
//   background-color: #2a2c41;
//   border-radius: 20px;
//   overflow: hidden;
//   height: 180px;
// `;

const CharacterBox = styled.div`
  /* flex: 1.6; */
  border-radius: 20px;
  height: 200px;
  position: relative;
  border-radius: 20px;
  width: 100%;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const RightTop = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  background-color: #2a2c41;

  @media (max-width: 780px) {
    width: calc(50% - 4px); /* 여백을 고려한 너비 */
    aspect-ratio: 16 / 9;
    height: auto;
  }
`;

const RightMiddle = styled.div`
  border-radius: 20px;
  overflow: hidden;
  /* background-color: bisque; */
  flex: 1;
  max-height: 500px;
  padding: 10px;
  @media (max-width: 780px) {
    width: calc(50% - 4px); /* 여백을 고려한 너비 */
    aspect-ratio: 16 / 9; /* RightTop과 동일한 비율 */
    max-height: 300px;
    flex: none;
  }
`;

const LiveOffBtn = styled.div`
  background-color: #ea2323;
  min-height: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 20px;
  padding: 15px;
  font-size: 25px;
  font-weight: 300;
  color: white;

  @media (max-width: 780px) {
    width: 100%; /* 전체 너비 사용 */
  }
`;
const BackBtn = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff9e1;
  border-radius: 20px;
  padding-left: 30px;
  padding: 15px;
  font-size: 20px;
  font-weight: 300;

  @media (max-width: 780px) {
    width: 100%; /* 전체 너비 사용 */
  }
`;

const RecordingListContainer = styled.div`
  margin-top: 15px;
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

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

// When running OpenVidu locally, leave these variables empty
// For other deployment type, configure them with correct URLs depending on your deployment
//let APPLICATION_SERVER_URL = "https://i12e204.p.ssafy.io/test/api";
//let APPLICATION_SERVER_URL = "https://192.168.30.199:6080/";
let APPLICATION_SERVER_URL = import.meta.env.VITE_NODE_JS_SERVER || "";

//let LIVEKIT_URL = "https://i12e204.p.ssafy.io:5443/twirp";
//let LIVEKIT_URL = "wss://192.168.30.199:7880/";
let LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_SERVER || "";

configureUrls();

function configureUrls() {
  // If APPLICATION_SERVER_URL is not configured, use default value from OpenVidu Local deployment
  if (!APPLICATION_SERVER_URL) {
    if (window.location.hostname === "localhost") {
      APPLICATION_SERVER_URL = "http://localhost:6080/";
    } else {
      APPLICATION_SERVER_URL = "https://" + window.location.hostname + ":6443/";
    }
  }

  // If LIVEKIT_URL is not configured, use default value from OpenVidu Local deployment
  if (!LIVEKIT_URL) {
    if (window.location.hostname === "localhost") {
      LIVEKIT_URL = "ws://localhost:7880/";
    } else {
      LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/";
      //LIVEKIT_URL = "ws://192.168.219.52:7880/";
    }
  }
}

const randomId = Math.random();

const LivePage = () => {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined
  );
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);
  const { state } = useLocation();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingService, setRecordingService] =
    useState<RecordingService | null>(null);
  const [isLiveOffModalOpen, setIsLiveOffModalOpen] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const location = useLocation();
  const roomId = location.state.roomId;
  const crewId = useCrewStore((state) => state.id || roomId);
  console.log("crewStore crewName : ", crewId);

  const navigate = useNavigate();

  const socket = useMemo(
    () =>
      io(`${import.meta.env.VITE_FLASK_SERVER}`, {
        transports: ["websocket"],
      }),
    []
  );

  // export const SocketContext = React.createContext<socketType>(socket);

  // 크루ID 로 roomName을 설정 //해쉬!!!

  const fakeTitle = state.roomName ? state.roomName : location.state.title;
  const roomName = `${crewId}`;

  const user = useUserStore((state) => state);
  const avatarType = user.avatarType;
  console.log("123354576356342523512", avatarType);
  const role = user.memberType ?? "user"; // useMemberType이 crew 없으면 user
  const participantName = user.nickname ?? "guest" + randomId;
  const participantRole = role === "crew" ? "publisher" : "subscriber";

  console.log("user", user);

  const handleBackBtnClick = () => {
    leaveRoom();
    navigate("/");
  };
  // LiveOffBtn 클릭 핸들러
  const handleLiveOffBtnClick = async () => {
    try {
      // 녹화 목록 불러오기
      if (recordingService && room) {
        const roomSid = await room.getSid();

        const recordingList = await recordingService.listRecordings(
          roomName,
          roomSid
        );
        console.log(
          "test입니다!!!!!!",
          "roomName : ",
          roomName,
          "/room.sid",
          roomSid
        );
        setRecordings(recordingList);
      }
      // 모달 열기
      setIsLiveOffModalOpen(true);
    } catch (error) {
      console.error("Failed to load recordings:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // 실제 종료 처리 함수
  const handleRealLiveOffBtnClick = async () => {
    try {
      leaveRoom();
      setIsLiveOffModalOpen(false);

      // 필요한 경우 추가 정리 작업 수행
    } catch (error) {
      console.error("Failed to leave room:", error);
    }
  };

  // 녹화 재생 핸들러
  const handlePlayRecording = async (recordingName: string) => {
    try {
      if (recordingService) {
        const url = await recordingService.getRecordingUrl(recordingName);
        setCurrentVideoUrl(url);
        setIsVideoModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to get recording URL:", error);
    }
  };

  // 녹화 삭제 핸들러
  const handleDeleteRecording = async (recordingName: string) => {
    try {
      console.log("지우기");
      if (recordingService) {
        await recordingService.deleteRecording(recordingName);
        console.log("recordingName", recordingName);
        setRecordings(recordings.filter((r) => r.name !== recordingName));
      }
    } catch (error) {
      console.error("Failed to delete recording:", error);
    }
  };

  // 녹화 상태 변경 핸들러
  const handleRecordingStateChange = useCallback((recording: boolean) => {
    setIsRecording(recording);
    //   setTimeout(updateRecordingsList, 1000);
    // },
    // [updateRecordingsList]
  }, []);

  const leaveRoom = useCallback(() => {
    if (room) {
      socket.on("disconnect from room", (data) => {
        const { room, participant } = data;

        // 받은 데이터 활용 예시
        console.log(`${participant}님이 방 ${room}에서 나갔습니다`);
      });
      socket.emit("leave", { roomName });

      room.disconnect();
      console.log("BYE");
      navigate("/");

      if (participantRole === "publisher") {
        alert("라이브를 종료합니다");
        const endLive = async (roomName: string) => {
          try {
            const response = await axiosInstance.patch(
              `/live/${roomName}`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("라이브 종료 성공!", response.data);
          } catch (err) {
            console.error("라이브 종료 실패", err);
          }
        };
        endLive(roomName);
      }
    }
  }, [room]);

  async function getToken(
    roomName: string,
    participantName: string,
    participantRole: string
  ) {
    try {
      const response = await fetch(APPLICATION_SERVER_URL + "/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName,
          participantName,
          participantRole,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Token response error:", error); // 에러 로깅 추가
        throw new Error(`Failed to get token: ${error.errorMessage}`);
      }

      const data = await response.json();
      console.log("Token received:", data); // 토큰 로깅 추가
      // TOKEN = data.token;
      return data.token;
    } catch (error) {
      console.error("Token fetch error:", error); // 에러 로깅 추가
      throw error;
    }
  }

  const onRecordingStop = useCallback((recoding: Recording) => {
    setRecordings((prev) => [...prev, recoding]);
  }, []);

  const init = useCallback(async () => {
    try {
      console.log("webRTC 방에 접속을 시도합니다다");
      console.log("APP" + APPLICATION_SERVER_URL);
      console.log("LIVE" + LIVEKIT_URL);

      const room = new Room();
      setRoom(room);
      setRecordingService(new RecordingService(room));
      room.on(
        RoomEvent.TrackSubscribed,
        (
          _track: RemoteTrack,
          publication: RemoteTrackPublication,
          participant: RemoteParticipant
        ) => {
          setRemoteTracks((prev) => [
            ...prev,
            {
              trackPublication: publication,
              participantIdentity: participant.identity,
            },
          ]);
        }
      );

      room.on(
        RoomEvent.TrackUnsubscribed,
        (_track: RemoteTrack, publication: RemoteTrackPublication) => {
          setRemoteTracks((prev) =>
            prev.filter(
              (track) =>
                track.trackPublication.trackSid !== publication.trackSid
            )
          );
        }
      );

      const token = await getToken(roomName, participantName, participantRole);
      setToken(token);

      socket.emit("join", {
        roomName,
        role: participantRole,
        participant: participantName,
        avatarType,
      }); // 아바타
      await room.connect(LIVEKIT_URL, token);

      if (participantRole === "publisher") {
        await room.localParticipant.enableCameraAndMicrophone();

        setLocalTrack(
          room.localParticipant.videoTrackPublications.values().next().value
            ?.videoTrack
        );

        //spring서버에 방 생성을 알려줍니다
        const createRoomPost = async () => {
          const requestData = {
            crewId: roomName, // number 또는 string 값
            title: fakeTitle,
          };

          //scheduleId가 존재하면 추가
          // if (scheduleId) {
          //   requestData["scheduleId"] = scheduleId;
          // }

          try {
            const response = await axiosInstance.post(`/live`, requestData, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("방생성 spring서버로 전송 성공", response.data);
          } catch (err) {
            console.log("방 생성을 spring서버에 알려주는 데 실패", err);
            console.error("spring 서버 응답:", err.response?.data);
          }
        };
        createRoomPost();
        const recordingService = new RecordingService(room);
        const roomSid = await room.getSid();

        setRecordingService(recordingService);
        const recordingList = await recordingService.listRecordings(
          roomName,
          roomSid
        );

        setRecordings(recordingList);
      }
    } catch (error) {
      console.log(
        "There was an error connecting to the room:",
        (error as Error).message
      );
    }
  }, [participantName, participantRole, roomName, socket]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    return leaveRoom;
  }, [leaveRoom]);

  return (
    <>
      {participantRole === "publisher" ? (
        <>
          <LivePageWrapper>
            <Left>
              <LeftTop>
                <StreamChat
                  participantName={participantName}
                  roomRole={role}
                  streamId={roomName}
                />
              </LeftTop>
              <CharacterBox>
                <CharacterContainer
                  socket={socket}
                  participantName={participantName}
                  roomName={roomName}
                  role={participantRole}
                />
              </CharacterBox>
            </Left>

            <Right>
              <RightTop>
                {token && (
                  <StreamLive
                    room={room}
                    participantName={participantName}
                    roomName={roomName}
                    localTrack={localTrack}
                    remoteTracks={remoteTracks}
                    serverUrl={APPLICATION_SERVER_URL}
                    token={token}
                    role={participantRole}
                    fakeTitle={fakeTitle}
                    avatarType={avatarType}
                  />
                )}
              </RightTop>
              <RightMiddle>
                {recordingService && (
                  <RecordingControls
                    recordingService={recordingService}
                    onRecordingStateChange={handleRecordingStateChange}
                    onRecordingStop={onRecordingStop}
                  />
                )}
                <div>{recordings.length}개의 녹화된 영상</div>
                <RecordingListContainer>
                  {recordings.map((recording) => (
                    <RecordingItem key={recording.name}>
                      <RecordingInfo>
                        <p>녹화 시간 : {formatDate(recording.startedAt)}</p>
                      </RecordingInfo>
                    </RecordingItem>
                  ))}
                </RecordingListContainer>
              </RightMiddle>

              <LiveOffBtn onClick={handleLiveOffBtnClick}>
                <span style={{ fontWeight: 700 }}>Off </span>the Live
              </LiveOffBtn>
            </Right>
          </LivePageWrapper>
          <LiveOffModal
            isOpen={isLiveOffModalOpen}
            recordings={recordings}
            onClose={() => setIsLiveOffModalOpen(false)}
            onConfirm={handleRealLiveOffBtnClick}
            onPlay={handlePlayRecording}
            onDelete={handleDeleteRecording}
          />

          {/* 비디오 재생 모달 */}
          <RecordingModal
            isOpen={isVideoModalOpen}
            onClose={() => {
              setIsVideoModalOpen(false);
              setCurrentVideoUrl("");
            }}
            videoUrl={currentVideoUrl}
          />
        </>
      ) : (
        <LivePageWrapper>
          <Left>
            <LeftTop>
              {token && (
                <StreamLive
                  room={room}
                  participantName={participantName}
                  roomName={roomName}
                  remoteTracks={remoteTracks} // localTrack 제거
                  serverUrl={APPLICATION_SERVER_URL}
                  token={token}
                  role={participantRole}
                  fakeTitle={fakeTitle}
                  avatarType={avatarType}
                />
              )}
            </LeftTop>
            <CharacterBox>
              <CharacterContainer
                socket={socket}
                participantName={participantName}
                roomName={roomName}
                role={participantRole}
              />
            </CharacterBox>
          </Left>

          <Right>
            <RightTop>
              <UserBox
                participantName={participantName}
                roomName={roomName}
                role={participantRole}
                avatarType={avatarType}
              />
            </RightTop>
            <RightMiddle>
              <StreamChat
                participantName={participantName}
                roomRole={role}
                streamId={roomName}
              />
            </RightMiddle>
            <BackBtn onClick={handleBackBtnClick}>
              <div style={{ color: "black" }}>
                <span style={{ fontWeight: 700 }}>Back </span>to the live
              </div>
              <div> &gt;</div>
            </BackBtn>
          </Right>
        </LivePageWrapper>
      )}
    </>
  );
};

export default LivePage;
