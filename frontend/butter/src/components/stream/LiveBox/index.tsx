import styled from "@emotion/styled";
import { Navigate, useNavigate } from "react-router-dom";

const LiveBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: wheat;
  display: flex;
  flex-direction: column;
`;

const LiveGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 50px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
`;

const LiveGenre = styled.div`
  /* margin: 10px 6px; */
  margin-left: 10px;
  margin-top: 6px;
  padding: 6px 15px;
  font-size: 15px;
  height: 28px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
`;

const LiveInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 90px;
  background-color: #c7c7c7;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: auto;
`;

const LiveInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const LiveTitle = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: black;
`;

const LiveLocation = styled.div`
  color: #317fde;
  font-size: 16px;
`;

const LiveBtn = styled.div`
  background-color: #ea2323;
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 30px;
  font-size: 30px;
  font-weight: 300;
  height: 50px;
  cursor: pointer;
`;

interface LiveProps {
  id: string;
  title: string;
  genres: string[];
  location: string | null;
}

const LiveBox = ({ id, title, genres, location }: LiveProps) => {
  const navigate = useNavigate();
  const goLive = (id, title) => {
    console.log(`Going live: ${title}`);
    navigate(`/stream/${title}`, {
      state: {
        roomId: id,
        title: title,
      },
    });
  };

  return (
    <LiveBoxWrapper key={id}>
      <LiveGenres>
        {genres.map((genre) => (
          <LiveGenre key={genre}>{genre}</LiveGenre>
        ))}
      </LiveGenres>
      <LiveInfoContainer>
        <LiveInfo>
          <LiveTitle>{title}</LiveTitle>
          <LiveLocation>{location}</LiveLocation>
        </LiveInfo>
        <LiveBtn onClick={() => goLive(id, title)}>Live</LiveBtn>
      </LiveInfoContainer>
    </LiveBoxWrapper>
  );
};

export default LiveBox;
