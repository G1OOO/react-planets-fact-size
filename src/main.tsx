import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import SolarSystem from "./pages/solar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/mercury"} />,
  },
  {
    path: "/mercury",
    element: <SolarSystem />,
  },
  {
    path: "/:planetName",
    element: <SolarSystem />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>,
);
