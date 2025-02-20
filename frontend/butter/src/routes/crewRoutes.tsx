import { Route } from "react-router-dom";
import CrewListPage from "../pages/crew/crewListPage";
import CrewDetailPage from "../pages/crew/crewDetailPage";
import CrewNoticePage from "../pages/crew/crewNoticePage";
import VideoEditPage from "../pages/video/VideoEditPage";
import CrewRegisterPage from "../pages/crew/CrewRegisterPage";
import MyCalendarPage from "../pages/crew/MyCalenderPage";
import { HighlightTwoTone } from "@mui/icons-material";
import CrewHighlightPage from "../pages/crew/CrewHighlightPage";


export const crewRoutes = (
  <Route path="/crew">
    <Route path="register" element={ <CrewRegisterPage/>} />
    <Route path="list" element={ <CrewListPage/> }/>
    <Route path="highlight/:id" element={ <CrewHighlightPage/> }/>
    <Route path="myCalendar" element={ <MyCalendarPage/>} />
    <Route path="detail/:id" element={ <CrewDetailPage/> }/>
    <Route path="notice" />
    <Route path="notice/detail/:id/:noticeId" element={ <CrewNoticePage/>}/>
    <Route path="video-edit/:id" element={<VideoEditPage />} />
    <Route path="follow" />
    <Route path="recommend" />
  </Route>
);
