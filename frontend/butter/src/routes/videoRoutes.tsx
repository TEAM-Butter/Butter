import { Route } from "react-router-dom";
import VideoClipPage from "../pages/video/VideoClipPage";

export const videoRoutes = (
  <Route path="/video">
    <Route path="clip" element={<VideoClipPage />} />
  </Route>
);
