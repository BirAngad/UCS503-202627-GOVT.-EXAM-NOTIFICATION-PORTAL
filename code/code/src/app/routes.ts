import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AndroidApp from "./pages/AndroidApp";
import IOSApp from "./pages/IOSApp";

import AdminPage from "./pages/AdminPage";

export const router = createBrowserRouter([
  {path:"/admin", Component:AdminPage},
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/android",
    Component: AndroidApp,
  },
  {
    path: "/ios",
    Component: IOSApp,
  },
]);
