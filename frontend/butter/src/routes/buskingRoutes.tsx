import { Route } from "react-router-dom";
import SchedulePage from "../pages/busking/SchedulePage";

export const buskingRoutes = (
  <Route path="/busking">
    <Route path="schedule" element={<SchedulePage />} />
  </Route>
);
