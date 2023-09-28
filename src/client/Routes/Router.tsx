import { Outlet, RouteObject } from 'react-router-dom';
import { VLAppBar } from '../Common/AppBar';
import ErrorPage from './ErrorPage';
export const routingInfo: RouteObject[] = [
  {
    path: '/',
    //element: <LegacyLandingPage/>,
    element: (
      <>
        <VLAppBar />
        <Outlet />
      </>
    ),
    errorElement: (
      <>
        <ErrorPage />
      </>
    ),
    children: [
      {
        index: true,
        element: <></>
      }
    ]
  },
];
