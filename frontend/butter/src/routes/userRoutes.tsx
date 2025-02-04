import { Route } from "react-router-dom";
import MemberDetailPage from "../pages/user/MemberDetailPage";
import LoginPage from "../pages/user/LoginPage";

export const userRoutes = (
  <>
    <Route path="auth">
      <Route path="login" element={<LoginPage/>}></Route>
    </Route>
    <Route path="member">
      <Route path="detail/:id" element={<MemberDetailPage />} />
    </Route>
  </>
);
