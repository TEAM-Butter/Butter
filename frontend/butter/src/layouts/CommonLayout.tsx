import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from "../components/common/header/Navbar";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 55px 1fr;
  background-color: #1C1D2C;
  height: 100vh;
`

const Header = styled.div`
  height: 55px; 
  background-color: #040A14;
  display: block;
  position: sticky;
  top: 0;
  z-index: 1;
`

const Main = styled.div`
  overflow-y: auto;
  color: white;
  z-index: 0;
`

export const CommonLayout = () => {
  return (
    <Wrapper>
      <Header >
        <Navbar />
      </Header>
      <Main>
        <Outlet /> {/* 여기에 자식 라우트의 컴포넌트가 렌더링됨 */}
      </Main>
    </Wrapper>
  );
};
