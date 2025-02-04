import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useState } from "react";
import LiveBox from "../../components/stream/LiveBox";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Nav = styled.nav`
  background: #040a14;
  color: white;
  padding: 5px;
  border-radius: 20px;
  height: 40px;
  width: 260px;
  display: flex;
  margin-top: auto;
`;

const TabsContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  width: 100%;
`;

const Tab = styled(motion.li)`
  border-radius: 20px;
  width: 100%;
  padding: 15px 5px;
  position: relative;
  cursor: pointer;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 0;
  user-select: none;
  justify-content: center;
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: first baseline;
`;

const LiveCard = styled.div`
  width: 400px;
  height: 350px;
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

const LiveListPage = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

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
        <Container>
          <Nav>
            <TabsContainer>
              {tabs.map((item) => (
                <Tab
                  key={item}
                  initial={false}
                  animate={{
                    backgroundColor: item === selectedTab ? "#eee" : "#eee0",
                    color: item === selectedTab ? "#000000" : "#eee",
                  }}
                  onClick={() => setSelectedTab(item)}
                >
                  {item}
                  {item === selectedTab && <Underline layoutId="underline" />}
                </Tab>
              ))}
            </TabsContainer>
          </Nav>
        </Container>
      </Header>
      <LiveContainer>
        {liveList.map((live) => (
          <LiveCard>
            <LiveBox
              id={live.id}
              title={live.title}
              genres={live.genres}
              location={live.location}
            />
          </LiveCard>
        ))}
      </LiveContainer>
    </LiveListPageWrapper>
  );
};

export default LiveListPage;
