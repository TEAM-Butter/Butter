import { Route } from "react-router-dom";
import CrewListPage from "../pages/crew/crewListPage";
import CrewDetailPage from "../pages/crew/crewDetailPage";
import CrewNoticePage from "../pages/crew/crewNoticePage";
import SamplePage from "../pages/crew/samplePage";
import MoveMap from "../pages/busking/sdf";

export const crewRoutes = (
  <Route path="/crew">
    <Route path="list" element={ <CrewListPage/> }/>
    <Route path="member" />
    <Route path="detail/:id" element={ <CrewDetailPage/> }/>
    <Route path="notice" />
    <Route path="notice/detail/:id/:noticeId" element={ <CrewNoticePage/>}/>
    <Route path="follow" />
    <Route path="recommend" />
    <Route path="samplePage" element={<MoveMap/>}/>
  </Route>
);
