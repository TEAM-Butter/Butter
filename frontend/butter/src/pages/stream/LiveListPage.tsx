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
  imageUrl: string;
  id: string;
  name: string;
  genres: string[];
}

interface Live {
  id: string;
  title: string;
  schedule: ScheduleInfo;
  crew: CrewInfo;
  thumbnailUrl: string;
}

const LiveListPage = () => {
  const [genreToggle, setGenreToggle] = useState("All");
  const [presentlivelist, setpresentlivelist] = useState<Live[]>([]);
  const sortBy = "startDate";

  useEffect(() => {
    const GetLiveList = async (genre: string) => {
      try {
        const endpoint =
          genre === "All"
            ? `/live/list?pageSize=10&sortBy=${sortBy}`
            : `/live/list?pageSize=10&sortBy=${sortBy}&crewGenre=${genre}`;

        const response = await axiosInstance.get(endpoint);
        setpresentlivelist(response.data);
      } catch (err) {
        console.error("에러 발생:", err);
        setpresentlivelist([]);
      }
    };

    GetLiveList(genreToggle);
  }, [genreToggle, sortBy]);
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
          {presentlivelist.map((live) => {
            return (
              <LiveCard key={live.id}>
                <LiveBox
                  id={live.id || ""}
                  title={live.title || "제목 없음"}
                  genres={
                    Array.isArray(live.crew?.genres) ? live.crew.genres : []
                  }
                  location={live.schedule?.place || "장소 정보 없음"}
                  crewImg={live.crew.imageUrl}
                  thumbnail={live.thumbnailUrl}
                />
              </LiveCard>
            );
          })}
        </LiveContainer>
      </div>
    </LiveListPageWrapper>
  );
};

export default LiveListPage;
