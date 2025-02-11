import { Route } from "react-router-dom";
import CrewListPage from "../pages/crew/crewListPage";
import CrewDetailPage from "../pages/crew/crewDetailPage";
import CrewNoticePage from "../pages/crew/crewNoticePage";
import SamplePage from "../pages/crew/samplePage";
import VideoEditPage from "../pages/video/VideoEditPage";

export const crewRoutes = (
  <Route path="/crew">
    <Route path="list" element={<CrewListPage />} />
    <Route path="detail/:id" element={<CrewDetailPage />} />
    <Route path="notice/detail/:id/:noticeId" element={<CrewNoticePage />} />
    <Route path="video-edit/:id" element={<VideoEditPage />} />
    <Route path="samplePage" element={<SamplePage />} />
  </Route>
);
