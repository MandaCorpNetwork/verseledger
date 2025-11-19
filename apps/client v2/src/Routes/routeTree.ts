import { createRouter } from '@tanstack/react-router';
import { indexRoute } from '.';
import { rootRoute } from './root';
import { sandbox } from './sandbox/sandbox';

/**
 * The Router is created Using the Manually Defined Tanstack Route Tree
 * This Pulls individual Page Components from their individual files.
 * Each file is only a base structure of the page, utilizing functional components that are theme extendable
 * These functions can be found in Common/Components/Functional
 */

export const routeTree = rootRoute.addChildren([indexRoute, sandbox]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadDelay: 200,
  context: {
    queryClient: undefined!,
  },
});
