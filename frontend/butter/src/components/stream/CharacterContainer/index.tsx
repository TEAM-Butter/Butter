import { motion } from "framer-motion";
import pet1 from "../../../assets/pets/pet1.png"; // 캐릭터 이미지
// import pet2 from "../../../assets/pets/pet2.png"; // 캐릭터 이미지
// import pet3 from "../../../assets/pets/pet3.png"; // 캐릭터 이미지
// import pet4 from "../../../assets/pets/pet4.png"; // 캐릭터 이미지
// import pet5 from "../../../assets/pets/pet5.png"; // 캐릭터 이미지
// import pet6 from "../../../assets/pets/pet6.png"; // 캐릭터 이미지
import like from "../../../assets/like.png";
import heart from "../../../assets/heart.png";
import clap from "../../../assets/clap.png";
import mic from "../../../assets/mic.png";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { SocketContent } from "../../../types/socket";
import { Socket } from "socket.io-client";
import { RoomName } from "@livekit/components-react";

// const images = [pet1, pet2, pet3, pet4, pet5, pet6];

const CharacterContainerWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

// CharacterBox에 대한 타입 정의
interface CharacterProps {
  left: number;
  top: number;
}

const CharacterBox = styled(motion.div)<CharacterProps>`
  position: absolute;
  width: 10vh;

  align-items: center;
  left: ${(props) => props.left}%;
  bottom: 20%;
  transform: translate(-50%, -50%);
`;
const EmotionBox = styled.div`
  width: 60%;
  height: 100%;
`;

const Emotion = styled(motion.img)`
  width: 3.5vh;
  height: auto;
  position: absolute;
  top: -20%; /* 캐릭터 머리 위에 배치 */
  left: 13%;
  transform: translateX(-50%);
  opacity: 0;
`;

const Character = styled.img`
  width: 10vh;
  height: auto;
`;

const TotalInfoBox = styled.div`
  width: 200px;
  height: 30px;
  background-color: #b9c1c8bf;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  top: 80%;
  left: 30px;
  border-radius: 30px;
  align-items: center;
`;

const TotalUserInfo = styled.div`
  color: black;
`;
const TotalHeartsInfo = styled.div`
  color: black;
`;
const TotalLikesInfo = styled.div`
  color: black;
`;

interface CharacterContainer {
  socket: Socket;
  participantName: string;
  roomName: string;
}

interface CharacterData {
  id: number;
  left: number;
  isEmoting: boolean;
  currentEmotion: any;
}

const EMOTION_DURATION = 2600; //2초
const COOLDOWN_DURATION = 3000; // 3초
const MY_CHARACTER_INDEX = 1; //내 캐릭터의 인덱스

const CharacterContainer = ({
  socket,
  participantName,
  roomName,
}: CharacterContainer) => {
  const [characters, setCharacters] = useState<CharacterData[]>(() =>
    Array.from({ length: 13 }, (_, index) => ({
      id: index,
      left: Math.random() * 80,
      isEmoting: false,
      currentEmotion: heart, // 기본값을 heart 이미지로 설정
    }))
  );

  const [heartCount, setHeartCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [myEmotionState, setMyEmotionState] = useState({
    isEmoting: false,
    currentEmotion: heart, // 기본값을 heart 이미지로 설정
  });

  // 사용자별 마지막 액션 시간 관리
  const lastActionTimeMap = useRef(new Map<number, number>());

  console.log("하이욤!!!!!!!!!!!!!!!!!!!!!");
  const canUserAct = (userId: number) => {
    const currentTime = Date.now();
    const lastTime = lastActionTimeMap.current.get(userId) || 0;
    console.log("Cooldown Check:", {
      currentTime,
      lastTime,
      diff: currentTime - lastTime,
      cooldown: COOLDOWN_DURATION,
      canAct: currentTime - lastTime >= COOLDOWN_DURATION,
    });
    return currentTime - lastTime >= COOLDOWN_DURATION;
  };

  const updateActionTime = (userId: number) => {
    console.log("Updating action time for user:", userId, Date.now());
    lastActionTimeMap.current.set(userId, Date.now());
  };

  // 내 캐릭터의 emotion 처리
  const getEmotionImage = (type: string) => {
    console.log("type:", type);
    switch (type) {
      case heart:
        return heart;
      case clap:
        return clap;
      case like:
        return like;
      case mic:
        return mic;
      default:
        return heart;
    }
  };

  const handleMyEmotion = useCallback(
    (emotionType: string, userId: number, emotion: string) => {
      if (!canUserAct(userId)) {
        console.log("쿨다운 중입니다");
        return;
      }

      console.log("확인용 emtoionType입니다!!!!!!!!!!!!", emotionType);
      setMyEmotionState({
        isEmoting: true,
        currentEmotion: getEmotionImage(emotionType),
      });

      updateActionTime(userId);

      setTimeout(() => {
        if (emotion === "heart") {
          socket.emit("increaseEmotionCount", {
            roomName,
            emotion: "heart",
          });
        }
        if (emotion === "like") {
          socket.emit("increaseEmotionCount", {
            roomName,
            emotion: "like",
          });
        }
        setMyEmotionState({
          isEmoting: false,
          currentEmotion: emotionType,
        });
      }, EMOTION_DURATION);
    },
    []
  );

  const handleOtherEmotion = useCallback(
    (userId: number, emotionType: string) => {
      if (userId === MY_CHARACTER_INDEX || !canUserAct(userId)) return;

      setCharacters((prev) =>
        prev.map((char, idx) =>
          idx === userId
            ? {
                ...char,
                isEmoting: true,
                currentEmotion: getEmotionImage(emotionType),
              }
            : char
        )
      );

      updateActionTime(userId);

      setTimeout(() => {
        setCharacters((prev) =>
          prev.map((char, idx) =>
            idx === userId
              ? { ...char, isEmoting: false, currentEmotion: heart }
              : char
          )
        );
      }, EMOTION_DURATION);
    },
    []
  );

  const handleMessage = (content: SocketContent) => {
    console.log("웹소켓에서 participantName을 불러옵니다!!", participantName);
    const id = 1;
    if (content.role === "publisher" && canUserAct(id)) {
      switch (content.label) {
        case "little_heart":
          console.log("여기입니다 2");
          setHeartCount((prev) => prev + 1);
          if (id === MY_CHARACTER_INDEX) {
            console.log("여기입니다 3");
            handleMyEmotion(heart, id, "heart");
          } else {
            console.log("여기입니다4");
            handleOtherEmotion(id, "heart");
          }
          break;
        case "clap":
          if (id === MY_CHARACTER_INDEX) {
            handleMyEmotion(clap, id, "clap");
          } else {
            handleOtherEmotion(id, "clap");
          }
          break;
        case "like":
          setLikeCount((prev) => prev + 1);
          if (id === MY_CHARACTER_INDEX) {
            handleMyEmotion(like, id, "like");
          } else {
            handleOtherEmotion(id, "like");
          }
          break;
        case "thumb_index":
          if (id === MY_CHARACTER_INDEX) {
            handleMyEmotion(mic, id, "mic");
          } else {
            handleOtherEmotion(id, "mic");
          }
          break;
      }
    }
  };
  const handleSocketOn = () => {
    socket.on("message", handleMessage);
  };

  useEffect(() => {
    handleSocketOn();
  }, [participantName, handleMyEmotion, handleOtherEmotion]);

  return (
    <CharacterContainerWrapper>
      <TotalInfoBox>
        <TotalUserInfo>16</TotalUserInfo>
        <TotalHeartsInfo>{heartCount}</TotalHeartsInfo>
        <TotalLikesInfo>{likeCount}</TotalLikesInfo>
      </TotalInfoBox>
      {characters.map((char) => (
        <CharacterBox
          key={char.id}
          left={char.left}
          top={0}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", bounce: 0.5 },
          }}
        >
          <EmotionBox>
            <Emotion
              src={
                char.id === MY_CHARACTER_INDEX
                  ? myEmotionState.currentEmotion || "heart"
                  : char.currentEmotion || "heart"
              }
              animate={
                (
                  char.id === MY_CHARACTER_INDEX
                    ? myEmotionState.isEmoting
                    : char.isEmoting
                )
                  ? { opacity: 1, y: -30 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.4 }}
            />
          </EmotionBox>
          <Character src={pet1} />
        </CharacterBox>
      ))}
    </CharacterContainerWrapper>
  );
};
export default CharacterContainer;
