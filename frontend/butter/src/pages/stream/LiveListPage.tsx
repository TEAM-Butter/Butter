import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LiveBox from "../../components/stream/LiveBox";
import { axiosInstance } from "../../apis/axiosInstance";
import { GenreToggle } from "../../components/common/toggle/toggle";
const LiveListPageWrapper = styled.div`
  width: 90vw;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  margin-bottom: 50px;
  height: 150px;
`;

const T1 = styled.span`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 60px;
`;
const T2 = styled.span`
  font-size: 60px;
  margin-left: 20px;
  margin-bottom: 60px;
  white-space: pre; /* 띄어쓰기를 그대로 유지 */
`;
const T3 = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;

///////////////

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
`;

const LiveContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: first baseline;
`;

const LiveCard = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 20px;
`;

// const LiveBox = styled.div`
//   width: 400px;
//   height: 350px;
//   border-radius: 20px;
//   background-color: wheat;
//   display: flex;
//   flex-direction: column;
// `;

const tabs = ["Popular", "Most Follower"];

const liveList = [
  {
    id: 1,
    title: "Street Soul",
    genres: ["Jazz", "Blues"],
    location: "Downtown Park",
  },
  {
    id: 2,
    title: "Urban Beats",
    genres: ["Hip Hop", "Rap", "R&B"],
    location: "City Square",
  },
  {
    id: 3,
    title: "Acoustic Afternoon",
    genres: ["Folk", "Acoustic"],
    location: "Central Plaza",
  },
  {
    id: 4,
    title: "Rock on the Road",
    genres: ["Rock", "Indie"],
    location: "Market Street",
  },
  {
    id: 5,
    title: "Electric Evening",
    genres: ["EDM", "Pop"],
    location: "Riverside Walk",
  },
  {
    id: 6,
    title: "Classical Corners",
    genres: ["Classical", "Instrumental", "Baroque"],
    location: "Old Town",
  },
];

interface ScheduleInfo {
  title: string;
  place: string;
  content: string;
}

interface CrewGenre {
  genre: string;
}

interface CrewInfo {
  id: number;
  name: string;
  genres: CrewGenre[];
}

interface Live {
  id: number;
  title: string;
  schedule: ScheduleInfo;
  crew: CrewInfo;
}

const LiveListPage = () => {
  const [genreToggle, setGenreToggle] = useState("All");
  const [presentlivelist, setpresentlivelist] = useState<Live[]>([]);

  useEffect(() => {
    const GetLiveList = async () => {
      try {
        // ✅ 헤더 추가: Authorization (JWT 토큰 포함)
        if (genreToggle == "All") {
          const response = await axiosInstance.get(
            `/live/list?pageSize=10&sortBy=followerCount`
          );
          setpresentlivelist(response.data);
        } else {
          const response = await axiosInstance.get(
            `/crew/list?pageSize=10&sortBy=followerCount&genre=${genreToggle}`
          );
          setGenreToggle(response.data);
        } // 크루 리스트 정보 받아옴
      } catch (err: any) {
        console.log("에러뜸뜸");
      }
      console.log("성공공");
    };

    GetLiveList();
  }, [genreToggle]);

  console.log(presentlivelist);

  return (
    <LiveListPageWrapper>
      <Header>
        <div>
          <div>
            <T1>Live</T1>
            <T2>Busking</T2>
          </div>
          <T3>라이브에 참여해 재미있는 모션과 함께 버스킹을 즐겨보세요!</T3>
        </div>
      </Header>
      <GenreToggle setGenreToggle={setGenreToggle} />
      <LiveContainer>
        {presentlivelist.map((live) => (
          <LiveCard key={live.id}>
            <LiveBox
              id={live.crew.id}
              title={live.title}
              genres={live.crew.genres}
              location={"임의의 장소"}
            />
          </LiveCard>
        ))}
      </LiveContainer>
    </LiveListPageWrapper>
  );
};

export default LiveListPage;
