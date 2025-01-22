import { Route } from "react-router-dom";
import UserProfilePage from "../pages/user/UserProfilePage";

export const userRoutes = (
  <Route path="/user">
    <Route path="profile" element={<UserProfilePage />} />
  </Route>
);
