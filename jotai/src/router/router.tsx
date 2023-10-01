import { createBrowserRouter } from "react-router-dom";
import Card from "../Card";
import Detail from "../Detail";

export const mainRoute = createBrowserRouter([
  {
    path: "/",
    element: <Card />,
  },
  {
    path: "/:id/detail",
    element: <Detail />,
  },
]);
