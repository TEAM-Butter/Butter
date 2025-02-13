import { Route } from "react-router-dom";
import CrewListPage from "../pages/crew/crewListPage";
import CrewDetailPage from "../pages/crew/crewDetailPage";
import CrewNoticePage from "../pages/crew/crewNoticePage";
import VideoEditPage from "../pages/video/VideoEditPage";
import CrewRegisterPage from "../pages/crew/CrewRegisterPage";

export const crewRoutes = (
  <Route path="/crew">
    <Route path="register" element={ <CrewRegisterPage/>} />
    <Route path="list" element={ <CrewListPage/> }/>
    <Route path="member" />
    <Route path="detail/:id" element={ <CrewDetailPage/> }/>
    <Route path="notice" />
    <Route path="notice/detail/:id/:noticeId" element={ <CrewNoticePage/>}/>
    <Route path="video-edit/:id" element={<VideoEditPage />} />
    <Route path="follow" />
    <Route path="recommend" />
  </Route>
);
