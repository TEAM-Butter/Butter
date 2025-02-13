import { Route } from "react-router-dom";
import Home1Page from "../pages/home/Home1Page";
import Home2Page from "../pages/home/Home2Page";
import Home3Page from "../pages/home/Home3Page";
import Home4Page from "../pages/home/Home4Page";

export const homeRoutes = (
  <Route path="/">
    <Route path="" element={<Home1Page/>}/>
    <Route path="home2" element={<Home2Page/>}/>
    <Route path="home3" element={<Home3Page/>}/>
    <Route path="home4" element={<Home4Page/>}/>
  </Route>

);
