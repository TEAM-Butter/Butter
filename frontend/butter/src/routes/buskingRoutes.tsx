import { Route } from "react-router-dom";
import SchedulePage from "../pages/busking/SchedulePage";

function BuskingHome() {
  return <div>Welcome to the Busking Home Page!</div>;
}




export const buskingRoutes = (
  <Route path="/busking" element={ <BuskingHome />}>
    <Route path="schedule" element={<SchedulePage />} />
  </Route>
);
