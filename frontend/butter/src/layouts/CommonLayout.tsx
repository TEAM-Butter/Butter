import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Navbar from "../components/common/header/Navbar";


const Header = styled.div`
  height: 55px; 
  background-color: #040A14;
  display: block;
  position: sticky;
  top: 0;
`

export const CommonLayout = () => {
  return (
    <div>
      <Header >
        <Navbar />
      </Header>
      <main>
        <Outlet /> {/* 여기에 자식 라우트의 컴포넌트가 렌더링됨 */}
      </main>
    </div>
  );
};
