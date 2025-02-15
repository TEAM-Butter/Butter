import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/error/NotFoundPage";
import { userRoutes } from "./routes/userRoutes";
import { streamRoutes } from "./routes/streamRoutes";
import { buskingRoutes } from "./routes/buskingRoutes";
import { crewRoutes } from "./routes/crewRoutes";
import { breadRoutes } from "./routes/breadRoutes";
import { homeRoutes } from "./routes/homeRoutes";
import "./styles/index.css";
import { CommonLayout } from "./layouts/CommonLayout";

import "./styles/reset.css";
import "./styles/index.css";
import "./styles/stream.css";
import "swiper/swiper-bundle.css";

import LiveListPage from "./pages/stream/LiveListPage";
import VideoEditPage from "./pages/video/VideoEditPage";
import { videoRoutes } from "./routes/videoRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CommonLayout />}>
          {homeRoutes}
          {userRoutes}
          {streamRoutes}
          <Route path="/stream-list" element={<LiveListPage />} />
          <Route path="/video-edit" element={<VideoEditPage />} />
          {buskingRoutes}
          {crewRoutes}
          {breadRoutes}
          {videoRoutes}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
