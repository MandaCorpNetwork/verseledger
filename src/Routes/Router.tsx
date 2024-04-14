import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { VLAppBar } from '../Common/AppBar';
import ErrorPage from './ErrorPage';
import { ContractLedgerTablePage } from './Index/ContractLedger/Ledger/ContractLedgerPage';
import { Home } from './Index/Home/Home';
import { PersonalLedgerPage } from './Index/PersonalLedger/PersonalLedgerPage';
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
        path: '/contract/ledger',
        element: <ContractLedgerTablePage />,
      },
      {
        path: '/ledger/personal',
        element: <PersonalLedgerPage />,
      },
    ],
  },
];
