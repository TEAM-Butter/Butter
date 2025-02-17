import { Route } from "react-router-dom";
import BreadChargePage from "../pages/bread/BreadChargePage";

export const breadRoutes = (
  <Route path="/bread">
    <Route path="charge" element={<BreadChargePage />} />
  </Route>
);
