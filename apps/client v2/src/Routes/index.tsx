import { Home } from "@/Apps/Home/Home";
import { rootRoute } from "./root";
import { createRoute } from "@tanstack/react-router";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
