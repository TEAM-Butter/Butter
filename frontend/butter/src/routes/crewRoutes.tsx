import { Route } from "react-router-dom";
import CrewListPage from "../pages/crew/crewListPage";
import CrewDetailPage from "../pages/crew/crewDetailPage";
import CrewNoticePage from "../pages/crew/crewNoticePage";
import SamplePage from "../pages/crew/samplePage";
import VideoEditPage from "../pages/video/VideoEditPage";

export const crewRoutes = (
  <Route path="/crew">
<<<<<<< HEAD
    <Route path="list" element={<CrewListPage />} />
    <Route path="detail/:id" element={<CrewDetailPage />} />
    <Route path="notice/detail/:id/:noticeId" element={<CrewNoticePage />} />
    <Route path="video-edit/:id" element={<VideoEditPage />} />
    <Route path="samplePage" element={<SamplePage />} />
=======
    <Route path="list" element={ <CrewListPage/> }/>
    <Route path="member" />
    <Route path="detail/:id" element={ <CrewDetailPage/> }/>
    <Route path="notice" />
    <Route path="notice/detail/:id/:noticeId" element={ <CrewNoticePage/>}/>
    <Route path="follow" />
    <Route path="recommend" />
    <Route path="samplePage" element={<SamplePage/>}/>
>>>>>>> e5edbde083b425f55f316c6c7b2b3977b60fe410
  </Route>
);
