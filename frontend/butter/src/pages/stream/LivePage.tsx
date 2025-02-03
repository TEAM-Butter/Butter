import styled from "@emotion/styled";
import StreamChat from "../../components/stream/StreamChat";
import { useState } from "react";
import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from "livekit-client";
import StreamLive from "../../components/stream/StreamLive";

const LivePageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 15px;
  height: 90vh;
  width: 90vw;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 800px;
  flex: 1;
  min-width: 200px;
`;

const Right = styled.div`
  width: 320px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
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
const CharacterBox = styled.div`
  /* flex: 1.6; */
  background-color: #2a2c41;
  border-radius: 20px;
  overflow: hidden;
  height: 180px;
`;

const RightTop = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  background-color: rebeccapurple;

  @media (max-width: 780px) {
    width: calc(50% - 4px); /* 여백을 고려한 너비 */
    aspect-ratio: 16 / 9;
    height: auto;
  }
`;

const RightMiddle = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background-color: bisque;
  flex: 1;

  @media (max-width: 780px) {
    width: calc(50% - 4px); /* 여백을 고려한 너비 */
    aspect-ratio: 16 / 9; /* RightTop과 동일한 비율 */
    height: auto;
    flex: none;
  }
`;

const LiveOffBtn = styled.div`
  background-color: #ea2323;
  min-height: 100px;
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

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

// When running OpenVidu locally, leave these variables empty
// For other deployment type, configure them with correct URLs depending on your deployment
//let APPLICATION_SERVER_URL = "";
//let APPLICATION_SERVER_URL = "http://192.168.219.52:6080/";
let APPLICATION_SERVER_URL = "";

//let LIVEKIT_URL = "";
let LIVEKIT_URL = "";

let TOKEN = "";
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
    }
  }
}

const LivePage = () => {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined
  );
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

  const [participantName, setParticipantName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [roomName, setRoomName] = useState("Test Room");

  async function joinRoom() {
    // Initialize a new Room object
    const room = new Room();
    setRoom(room);

    // Specify the actions when events take place in the room
    // On every new Track received...
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

    // On every Track destroyed...
    room.on(
      RoomEvent.TrackUnsubscribed,
      (_track: RemoteTrack, publication: RemoteTrackPublication) => {
        setRemoteTracks((prev) =>
          prev.filter(
            (track) => track.trackPublication.trackSid !== publication.trackSid
          )
        );
      }
    );

    try {
      // Get a token from your application server with the room name and participant name
      const token = await getToken(roomName, participantName);
      // Connect to the room with the LiveKit URL and the token
      await room.connect(LIVEKIT_URL, token);

      // Publish your camera and microphone
      await room.localParticipant.enableCameraAndMicrophone();
      setLocalTrack(
        room.localParticipant.videoTrackPublications.values().next().value
          .videoTrack
      );
    } catch (error) {
      console.log(
        "There was an error connecting to the room:",
        (error as Error).message
      );
      await leaveRoom();
    }
  }

  async function leaveRoom() {
    // Leave the room by calling 'disconnect' method over the Room object
    await room?.disconnect();

    // Reset the state
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The method below request the creation of a token to
   * your application server. This prevents the need to expose
   * your LiveKit API key and secret to the client side.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints. In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   */
  async function getToken(roomName: string, participantName: string) {
    const response = await fetch(APPLICATION_SERVER_URL + "token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: roomName,
        participantName: participantName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get token: ${error.errorMessage}`);
    }

    const data = await response.json();
    TOKEN = data.token;
    return data.token;
  }
  //조건부 렌더링
  const user = "crew";
  return (
    <>
      {user === "crew" ? (
        <>
          <LivePageWrapper>
            <Left>
              <LeftTop>
                <StreamChat />
              </LeftTop>
              <CharacterBox>b</CharacterBox>
            </Left>

            <Right>
              <RightTop>
                <StreamLive
                  room={room}
                  onSubmit={(e) => {
                    joinRoom();
                    e.preventDefault();
                  }}
                  participantName={participantName}
                  onParticipantNameChange={(e) =>
                    setParticipantName(e.target.value)
                  }
                  roomName={roomName}
                  onRoomNameChange={(e) => setRoomName(e.target.value)}
                  localTrack={localTrack}
                  remoteTracks={remoteTracks}
                  serverUrl={APPLICATION_SERVER_URL}
                  token={TOKEN}
                />
              </RightTop>
              <RightMiddle>v</RightMiddle>
              <LiveOffBtn onClick={leaveRoom}>
                <span style={{ fontWeight: 700 }}>Off </span>the Live
              </LiveOffBtn>
            </Right>
          </LivePageWrapper>
        </>
      ) : (
        <LivePageWrapper>
          <Left>
            <LeftTop>
              <StreamLive
                room={room}
                onSubmit={(e) => {
                  joinRoom();
                  e.preventDefault();
                }}
                participantName={participantName}
                onParticipantNameChange={(e) =>
                  setParticipantName(e.target.value)
                }
                roomName={roomName}
                onRoomNameChange={(e) => setRoomName(e.target.value)}
                localTrack={localTrack}
                remoteTracks={remoteTracks}
              />
            </LeftTop>
            <CharacterBox>b</CharacterBox>
          </Left>

          <Right>
            <RightTop>c</RightTop>
            <RightMiddle>
              <StreamChat />
            </RightMiddle>
            <BackBtn onClick={leaveRoom}>
              <div>
                <span style={{ fontWeight: 700 }}>Back </span>to the live
              </div>
              <div> &gt;</div>
            </BackBtn>
          </Right>
        </LivePageWrapper>
      )}
    </>
    // <LivePageWrapper>
    //   <Left>
    //     <LiveBox>
    //       <StreamLive
    //         room={room}
    //         onSubmit={(e) => {
    //           joinRoom();
    //           e.preventDefault();
    //         }}
    //         participantName={participantName}
    //         onParticipantNameChange={(e) => setParticipantName(e.target.value)}
    //         roomName={roomName}
    //         onRoomNameChange={(e) => setRoomName(e.target.value)}
    //         onLeaveButtonClick={leaveRoom}
    //         localTrack={localTrack}
    //         remoteTracks={remoteTracks}
    //       />
    //     </LiveBox>
    //     <CharacterBox>b</CharacterBox>
    //   </Left>

    //   <Right>
    //     <MyBox>c</MyBox>
    //     <ChatBox>
    //       <StreamChat />
    //     </ChatBox>
    //   </Right>
    // </LivePageWrapper>
  );
};

export default LivePage;
