import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/error/NotFoundPage";
import { userRoutes } from "./routes/userRoutes";
import { streamRoutes } from "./routes/streamRoutes";
import { buskingRoutes } from "./routes/buskingRoutes";
import { crewRoutes } from "./routes/crewRoutes"
import { breadRoutes } from "./routes/breadRoutes"
import "./styles/index.css";
import { CommonLayout } from "./layouts/CommonLayout";
import HomePage from "./pages/home/HomePage";

import "./styles/reset.css";
import "./styles/index.css";
import "./styles/stream.css";
import LiveListPage from "./pages/stream/LiveListPage";
import VideoEditPage from "./pages/video/VideoEditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<HomePage />} />
          {userRoutes}
          {streamRoutes}
          <Route path="/stream-list" element={<LiveListPage />} />
          <Route path="/video-edit" element={<VideoEditPage />} />
          {buskingRoutes}
          {crewRoutes}
          {breadRoutes}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
