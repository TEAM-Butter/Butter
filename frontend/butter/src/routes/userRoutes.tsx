import { Route } from "react-router-dom";
import MemberDetailPage from "../pages/user/MemberDetailPage";
import LoginPage from "../pages/user/LoginPage";
import SignupPage from "../pages/user/SignupPage";
import NaverCallback from "../components/user/Naver/NaverCallback";

export const userRoutes = (
  <>
    <Route path="auth">
      <Route path="login" element={<LoginPage/>}></Route>
      <Route path="login/social/naver/callback" element={<NaverCallback/>}></Route>
      <Route path="signup" element={<SignupPage/>}></Route>
    </Route>
    <Route path="member">
      <Route path="detail/:id" element={<MemberDetailPage />} />
    </Route>
  </>
);
