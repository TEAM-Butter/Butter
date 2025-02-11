import { motion } from "framer-motion";
import pet1 from "../../../assets/pets/pet1.png"; // 캐릭터 이미지
// import pet2 from "../../../assets/pets/pet2.png"; // 캐릭터 이미지
// import pet3 from "../../../assets/pets/pet3.png"; // 캐릭터 이미지
// import pet4 from "../../../assets/pets/pet4.png"; // 캐릭터 이미지
// import pet5 from "../../../assets/pets/pet5.png"; // 캐릭터 이미지
// import pet6 from "../../../assets/pets/pet6.png"; // 캐릭터 이미지
import like from "../../../assets/like.png";
import heart from "../../../assets/heart.png";
import styled from "@emotion/styled";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { SocketContent } from "../../../types/socket";

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

  /* justify-content: space-between; */
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
  /* width: 3vh;
  height: auto;
  top: -15%; */
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
  /* bottom: 0; */
  height: auto;
`;

interface CharacterContainer {
  socket: Socket;
}

const CharacterContainer = ({ socket }: CharacterContainer) => {
  const [visibleEmotions, setVisibleEmotions] = useState<boolean[]>(
    Array(13).fill(false)
  );

  //캐릭터를 동작시키는 함수를 적어라
  socket.on("message", (content: SocketContent) => {
    console.log("응답입니다");
    if (content.role == "publisher") {
      if (content.label == "little_heart") {
        console.log("하트입니다");
        handleButtonClick(1);
      }
      if (content.label == "clap") {
        console.log("박수입니다");
      }
      if (content.label == "like") {
        console.log("엄지척입니다");
      }
      if (content.label == "thumb_index") {
        console.log("앵콜입니다");
      }
    }
  });

  const handleButtonClick = (index: number) => {
    setVisibleEmotions((prev) => {
      const newEmotions = [...prev];
      newEmotions[index] = true;
      return newEmotions;
    });
    setTimeout(() => {
      setVisibleEmotions((prev) => {
        const newEmotions = [...prev];
        newEmotions[index] = false;
        return newEmotions;
      });
    }, 1000);
  };

  const [characters] = useState(() =>
    Array.from({ length: 13 }, (_, index) => ({
      id: index,
      left: Math.random() * 80, // 0 ~ 80% 범위
      // top: Math.random() * 80, // 0 ~ 80% 범위
    }))
  );

  return (
    <CharacterContainerWrapper>
      {characters.map((char, index) => (
        <CharacterBox
          key={char.id}
          left={char.left}
          top={char.top}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", bounce: 0.5 },
          }}
        >
          <EmotionBox>
            <Emotion
              src={heart}
              animate={
                visibleEmotions[index]
                  ? { opacity: 1, y: -30 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.4 }}
            />
          </EmotionBox>
          <Character src={pet1} onClick={() => handleButtonClick(index)} />
        </CharacterBox>
      ))}
    </CharacterContainerWrapper>
  );
};

export default CharacterContainer;
