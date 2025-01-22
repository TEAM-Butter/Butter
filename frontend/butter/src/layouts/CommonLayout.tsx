import { Outlet } from "react-router-dom";

export const CommonLayout = () => {
  return (
    <div>
      {/* 메인 컨텐츠 */}
      <main>
        <Outlet /> {/* 여기에 자식 라우트의 컴포넌트가 렌더링됨 */}
      </main>
    </div>
  );
};
