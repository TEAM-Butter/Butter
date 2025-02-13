import { Route } from "react-router-dom";
import BreadRechargePage from "../pages/bread/BreadRechargePage";

export const breadRoutes = (
  <Route path="/bread">
    <Route path="recharge" element={ <BreadRechargePage/> }/>
  </Route>
);
