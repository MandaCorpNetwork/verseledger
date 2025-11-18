import { createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { AppShell } from '@/AppShell';

interface RouterContext {
  queryClient: QueryClient;
}

/**
 * Root Route intended to Only return the AppShell component
 * Intakes the Query Client for ApiCalls and passed in here as well.
 */

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <AppShell></AppShell>,
});
