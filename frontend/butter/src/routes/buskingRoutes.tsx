import { Route } from "react-router-dom";
import SchedulePage from "../pages/busking/SchedulePage";
import SEE from "../pages/busking/sdf";

export const buskingRoutes = (
  <Route path="/busking">
    <Route path="" element={<SchedulePage/>}/>
    <Route path="list"/>
  </Route>
);
