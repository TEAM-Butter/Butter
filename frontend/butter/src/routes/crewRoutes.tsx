import { Route } from "react-router-dom";



export const crewRoutes = (
  <Route path="/crew">
    <Route path="member" />
    <Route path="detail/:id" />
    <Route path="notice" />
    <Route path="notice/detail/:id" />
    <Route path="follow" />
    <Route path="recommend" />
  </Route>
);
