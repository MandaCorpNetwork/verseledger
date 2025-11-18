/// <reference types="vite/client" />
import './main.css';
// import './i18n';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from '@tanstack/react-router';
import { router } from './Routes/routeTree';

/**
 * Main Application Entrypoint
 * Sets Up:
 *  Query Client Provider
 *  Time Localization Provider
 *  Language Localization Provider
 *  Router Provider
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </QueryClientProvider>,
);
