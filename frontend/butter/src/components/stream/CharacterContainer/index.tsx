import { motion } from "framer-motion";
import Avatar1 from "../../../assets/pets/pet1.png"; // 캐릭터 이미지
import Avatar2 from "../../../assets/pets/pet2.png"; // 캐릭터 이미지
import Avatar3 from "../../../assets/pets/pet3.png"; // 캐릭터 이미지
import Avatar4 from "../../../assets/pets/pet4.png"; // 캐릭터 이미지
import Avatar5 from "../../../assets/pets/pet5.png"; // 캐릭터 이미지
import Avatar6 from "../../../assets/pets/pet6.png"; // 캐릭터 이미지

import like from "../../../assets/like.png";
import heart from "../../../assets/heart.png";
import clap from "../../../assets/clap.png";
import mic from "../../../assets/mic.png";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { MemberType, SocketContent } from "../../../types/socket";
import { Socket } from "socket.io-client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import clapclap from "../../../assets/clapclap.png";
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
  display: flex;
  flex-direction: column;
  width: 10vh;

  align-items: center;
  left: ${(props) => props.left}%;
  bottom: 10%;
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

const EmotionClickBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 250px;
  height: 40px;
  background-color: black;
  position: absolute;
  left: 35%;
  left: 50%; // 부모 요소의 중앙을 기준점으로 설정
  transform: translateX(-50%); // 자신의 너비의 절반만큼 왼쪽으로 이동
  border-bottom-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  border-bottom-right-radius: 18px;
`;

const BreadBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
  display: flex;
  align-items: center;
  color: black;
  gap: 2px;
`;
const TotalHeartsInfo = styled.div`
  display: flex;
  align-items: center;
  color: black;
  gap: 2px;
`;
const TotalLikesInfo = styled.div`
  display: flex;
  align-items: center;
  color: black;
  gap: 2px;
`;

const ClapBox = styled.img`
  width: 25vh;
  height: 50px;
  position: absolute;
  top: 70%;
  right: 30px;
`;

const CharacterName = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 300;
  background-color: rgba(1, 1, 1, 0.5);
  padding: 2px;
  padding-left: 6px;
  padding-right: 6px;
`;

interface CharacterContainer {
  socket: Socket;
  participantName: string;
  roomName: string;
  role: string;
}

const EMOTION_DURATION = 2600; //2초
const COOLDOWN_DURATION = 3000; // 3초

const CharacterContainer = ({
  socket,
  participantName,
  roomName,
}: CharacterContainer) => {
  const [membersCount, setMembersCount] = useState(0);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [heartCount, setHeartCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [myEmotionState, setMyEmotionState] = useState({
    isEmoting: false,
    currentEmotion: heart, // 기본값을 heart 이미지로 설정
  });

  const [publisherClap, setPublisherClap] = useState(false);

  // 사용자별 마지막 액션 시간 관리
  const lastActionTimeMap = useRef(new Map<string, number>());

  const getAvatarImage = (avatarType: string) => {
    switch (avatarType) {
      case "Avatar1":
        return Avatar1;
      case "Avatar2":
        return Avatar2;
      case "Avatar3":
        return Avatar3;
      case "Avatar4":
        return Avatar4;
      case "Avatar5":
        return Avatar5;
      case "Avatar6":
        return Avatar6;
    }
  };

  const canUserAct = (nickname: string) => {
    const currentTime = Date.now();
    const lastTime = lastActionTimeMap.current.get(nickname) || 0;
    console.log("Cooldown Check:", {
      currentTime,
      lastTime,
      diff: currentTime - lastTime,
      cooldown: COOLDOWN_DURATION,
      canAct: currentTime - lastTime >= COOLDOWN_DURATION,
    });
    return currentTime - lastTime >= COOLDOWN_DURATION;
  };

  const updateActionTime = (nickname: string) => {
    console.log("Updating action time for user:", nickname, Date.now());
    lastActionTimeMap.current.set(nickname, Date.now());
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
    (emotionType: string, nickname: string, emotion: string) => {
      // if (!canUserAct(userId)) {
      //   console.log("쿨다운 중입니다");
      //   return;
      // }

      console.log("확인용 emtoionType입니다!!!!!!!!!!!!", emotionType);
      setMyEmotionState({
        isEmoting: true,
        currentEmotion: emotionType,
      });
      // members 배열도 업데이트
      setMembers((prev) =>
        prev.map((member) =>
          member.nickname === nickname
            ? {
                ...member,
                isEmoting: true,
                currentEmotion: emotionType,
              }
            : member
        )
      );

      console.log("확인용 emtoionType입니다2222222", emotionType);
      updateActionTime(nickname);

      setTimeout(() => {
        if (emotion === "heart" && !myEmotionState.isEmoting) {
          socket.emit("increaseEmotionCount", {
            roomName,
            emotion: "heart",
          });
        }
        if (emotion === "like" && !myEmotionState.isEmoting) {
          socket.emit("increaseEmotionCount", {
            roomName,
            emotion: "like",
          });
        }
        // timeout에서도 두 상태 모두 업데이트
        setMyEmotionState({
          isEmoting: false,
          currentEmotion: emotionType,
        });

        setMembers((prev) =>
          prev.map((member) =>
            member.nickname === nickname
              ? {
                  ...member,
                  isEmoting: false,
                  currentEmotion: emotionType,
                }
              : member
          )
        );
      }, EMOTION_DURATION);
    },
    [myEmotionState.isEmoting]
  );

  const handlePublisherEmotion = useCallback(() => {
    setPublisherClap((prev) => !prev);
    setTimeout(() => {
      setPublisherClap((prev) => !prev);
    }, EMOTION_DURATION);
  }, [publisherClap]);

  //행동을 한 사람의 nickname
  const handleOtherEmotion = useCallback(
    (nickname: string, emotionType: string) => {
      if (!canUserAct(nickname)) return;

      setMembers((prev) =>
        prev.map((char) =>
          char.nickname === nickname
            ? {
                ...char,
                isEmoting: true,
                currentEmotion: getEmotionImage(emotionType),
              }
            : char
        )
      );

      updateActionTime(nickname);

      setTimeout(() => {
        setMembers((prev) =>
          prev.map((char) =>
            char.nickname === nickname
              ? { ...char, isEmoting: false, currentEmotion: heart }
              : char
          )
        );
      }, EMOTION_DURATION);
    },
    []
  );

  const handleMessage = (content: SocketContent) => {
    if (content.members && content.members.length > 0) {
      // members 상태 업데이트
      setMembersCount(content.members.length);
      setMembers((prevMembers) => {
        // 이미 같은 nickname을 가진 멤버가 있는지 확인
        const updatedMembers = content.members.map((member) => {
          const existingMember = prevMembers.find(
            (m) => m.nickname === member.nickname
          );
          return {
            ...member,
            left: existingMember?.left ?? Math.random() * 70 + 10,
            isEmoting: existingMember?.isEmoting ?? false,
            currentEmotion: existingMember?.currentEmotion ?? null, // 초기값은 null
          };
        });
        console.log("Updated members:", updatedMembers);
        return updatedMembers;
      });
    }
    // setMembersCount(content.members?.length);
    if (content.roomMotions !== null) {
      setHeartCount(content.roomMotions.heart || 0);
      setLikeCount(content.roomMotions.like || 0);
    }

    //현재 행동하는 사람
    const id = content.participant;
    if (content.role === "subscriber" && canUserAct(id)) {
      const isCurrentParticipant = content.members.some(
        (member) => member.nickname === id
      );

      switch (content.label) {
        case "little_heart":
          console.log("💕💕💕💕💕");
          if (isCurrentParticipant) {
            console.log("😒😒😒😒😒😒");
            handleMyEmotion(heart, id, "heart");
          } else {
            console.log("여기입니다4");
            handleOtherEmotion(id, "heart");
          }
          break;
        case "clap":
          console.log("👏👏👏👏👏");

          if (isCurrentParticipant) {
            handleMyEmotion(clap, id, "clap");
          } else {
            handleOtherEmotion(id, "clap");
          }
          break;
        case "like":
          console.log("👍👍👍👍");

          if (isCurrentParticipant) {
            handleMyEmotion(like, id, "like");
          } else {
            handleOtherEmotion(id, "like");
          }
          break;
        case "thumb_index":
          console.log("🎤🎤🎤🎤🎤");
          if (isCurrentParticipant) {
            handleMyEmotion(mic, id, "mic");
          } else {
            handleOtherEmotion(id, "mic");
          }
          break;
      }
    }
    if (content.role === "publisher") {
      if (content.label === "clap") {
        handlePublisherEmotion();
      }
    }
  };
  const handleSocketOn = () => {
    socket.on("message", handleMessage);
    socket.on("increaseEmotionCount", (content) => {
      setHeartCount(content.heart);
      setLikeCount(content.like);
    });
  };

  useEffect(() => {
    handleSocketOn();

    return () => {};
  }, [socket, participantName, handleMyEmotion, handleOtherEmotion]);

  return (
    <CharacterContainerWrapper>
      <EmotionClickBox>
        <div style={{ gap: "10px", display: "flex" }}>
          <FavoriteBorderIcon
            onClick={() => {
              socket.emit("increaseEmotionCount", {
                roomName,
                emotion: "heart",
              });
            }}
            fontSize="small"
          />
          <ThumbUpAltOutlinedIcon
            onClick={() => {
              socket.emit("increaseEmotionCount", {
                roomName,
                emotion: "like",
              });
            }}
            fontSize="small"
          />
        </div>
        <BreadBox>
          <BakeryDiningOutlinedIcon /> Charge
        </BreadBox>
      </EmotionClickBox>
      <TotalInfoBox>
        <TotalUserInfo>
          <PersonOutlineOutlinedIcon fontSize="small" />
          {membersCount}
        </TotalUserInfo>
        <TotalHeartsInfo>
          <FavoriteIcon fontSize="small" />
          {heartCount}
        </TotalHeartsInfo>
        <TotalLikesInfo>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          {likeCount}
        </TotalLikesInfo>
      </TotalInfoBox>
      {members &&
        members.map((member) => (
          <CharacterBox
            key={member.nickname}
            left={member.left}
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
                src={member.currentEmotion || undefined}
                animate={
                  member.isEmoting
                    ? { opacity: 1, y: -30 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.4 }}
              />
            </EmotionBox>
            <Character src={getAvatarImage(member.avatarType)} />
            <CharacterName>{member.nickname}</CharacterName>
          </CharacterBox>
        ))}
      {publisherClap && <ClapBox src={clapclap} />}
    </CharacterContainerWrapper>
  );
};
export default CharacterContainer;
