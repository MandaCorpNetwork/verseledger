import { Home } from "@/Apps/Home/Home";
import { rootRoute } from "./root";
import { createRoute } from "@tanstack/react-router";

/**
 * The Index Page is meant to be free of any functionality or components. The Home Component itself is specifically just a video background.
 * Each Individual OSTheme exports a Shell component used by Shell Map to define root level components for site navigation
 */

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
