import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/error/NotFoundPage";
import { userRoutes } from "./routes/userRoutes";
import { streamRoutes } from "./routes/streamRoutes";
import { buskingRoutes } from "./routes/buskingRoutes";
import { crewRoutes } from "./routes/crewRoutes";
import { CommonLayout } from "./layouts/CommonLayout";

import "./styles/reset.css";
import "./styles/index.css";
import "./styles/stream.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CommonLayout />}>
          {userRoutes}
          {streamRoutes}
          {buskingRoutes}
          {crewRoutes}
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
