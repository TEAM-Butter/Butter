import { Route } from "react-router-dom";
import LivePage from "../pages/stream/LivePage";

export const streamRoutes = (
  <Route path="/stream">
    <Route path=":streamId" element={<LivePage />} />
  </Route>
);
