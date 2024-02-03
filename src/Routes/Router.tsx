import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { VLAppBar } from '../Common/AppBar';
import ErrorPage from './ErrorPage';
import { ContractLedgerSplash } from './Index/ContractLedger/Splash/ContractLedgerSplash';
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
      {
        path: '/contract/splash',
        element: <ContractLedgerSplash />,
      },
    ],
  },
];
