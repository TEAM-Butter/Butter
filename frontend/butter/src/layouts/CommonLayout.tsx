import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";

export const CommonLayout = () => {
  return (
    <div>
      <header style={{ height:' 55px', backgroundColor: '#040A14', }}>
        <Header />
      </header>
      <main>
        <Outlet /> {/* 여기에 자식 라우트의 컴포넌트가 렌더링됨 */}
      </main>
    </div>
  );
};
