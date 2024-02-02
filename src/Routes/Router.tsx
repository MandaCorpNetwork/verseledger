import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { VLAppBar } from '../Common/AppBar';
import ErrorPage from './ErrorPage';
import { Home } from './Index/Home';
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
        element: <Home />,
      },
    ],
  },
];
