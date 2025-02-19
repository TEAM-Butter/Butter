import styled from "@emotion/styled";
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

const LiveContainer = styled.div`
  margin-top: 30px;
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

interface ScheduleInfo {
  title: string;
  place: string;
  content: string;
}

interface CrewInfo {
  id: string;
  name: string;
  genres: string[];
}

interface Live {
  id: string;
  title: string;
  schedule: ScheduleInfo;
  crew: CrewInfo;
}

const LiveListPage = () => {
  const [genreToggle, setGenreToggle] = useState("All");
  const [presentlivelist, setpresentlivelist] = useState<Live[]>([]);
  const sortBy = "startDate";

  useEffect(() => {
    const GetLiveList = async () => {
      try {
        // ✅ 헤더 추가: Authorization (JWT 토큰 포함)
        if (genreToggle == "All") {
          const response = await axiosInstance.get(
            `/live/list?pageSize=10&sortBy=${sortBy}`
          );
          setpresentlivelist(response.data);
        } else {
          console.log("genreToggle🤣🤣🤣", genreToggle);
          const response = await axiosInstance.get(
            `/live/list?pageSize=10&sortBy=${sortBy}&crewGenre=${genreToggle}`
          );
          console.log("Filtered genre response:", response.data);
          setpresentlivelist(response.data);
        } // 크루 리스트 정보 받아옴
      } catch (err) {
        console.log("에러뜸뜸", err);
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
      <div>
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
      </div>
    </LiveListPageWrapper>
  );
};

export default LiveListPage;
