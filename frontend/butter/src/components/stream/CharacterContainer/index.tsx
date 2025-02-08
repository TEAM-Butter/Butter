import background from "../../../assets/background.png";
import characterImg from "../../../assets/pets/pet1.png"; // 캐릭터 이미지
import styled from "@emotion/styled";

const CharacterContainerWrapper = styled.div`
  position: relative;
  /* border-radius: 20px;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 30px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden; */
  /* padding: 40px; */
  padding: 50px;
`;

// Character 컴포넌트에 대한 타입 정의
interface CharacterProps {
  left: number;
}

const Character = styled.img<CharacterProps>`
  position: absolute;
  width: 10vw; /* 화면 너비의 10% */
  height: auto; /* 화면 높이의 10% */
  top: 90%;
  left: ${(props) => props.left}%;
  transform: translate(-50%, -50%);
`;

const CharacterContainer = () => {
  const characters = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    left: Math.random() * 80, // 0 ~ 80% 범위
  }));

  return (
    <CharacterContainerWrapper>
      {characters.map((char) => (
        <Character key={char.id} src={characterImg} left={char.left} />
      ))}
    </CharacterContainerWrapper>
  );
};

export default CharacterContainer;
