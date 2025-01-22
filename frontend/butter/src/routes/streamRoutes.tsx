import { Route } from "react-router-dom";
import LivePage from "../pages/stream/LivePage";

export const streamRoutes = (
  <Route path="/stream">
    <Route path="live/:streamId" element={<LivePage />} />
  </Route>
);
