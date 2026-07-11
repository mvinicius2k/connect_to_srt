import App from "@/App";
import Index from "@/pages/Index";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Index,
      },
    ],
  },
]);
