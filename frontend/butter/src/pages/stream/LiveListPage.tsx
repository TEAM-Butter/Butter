import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import LiveBox from "../../components/stream/LiveBox";
import { axiosInstance } from "../../apis/axiosInstance";
import { GenreToggle } from "../../components/common/toggle/toggle";
const LiveListPageWrapper = styled.div`
  margin: 40px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 40px 0 20px 0;
  align-items: flex-end;

  #pageInfo {
    padding-top: 10px;
  }

  @media (max-width: 915px) {
      grid-template-columns: 1fr;
      gap: 10px;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  font-size: 60px;

  #pageTitleMd {
    font-weight: 200;
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
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
          <Text>
            <div id="pageTitleLg">Live</div>
            <div id="pageTitleMd">Busking</div>
          </Text>
          <div id="pageInfo">라이브에 참여해 재미있는 모션과 함께 버스킹을 즐겨보세요!</div>
        </div>
        <div>
          <GenreToggle setGenreToggle={setGenreToggle} keyName="stream" />
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
