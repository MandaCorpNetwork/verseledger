import { Outlet, RouteObject } from 'react-router-dom';

import { DiscordLoginUtility } from '@/Utils/discordLoginUtility';

import { VLAppBar } from '../Common/Components/App/AppBar';
import { APIDocs } from './api-docs/APIDocs';
import { ContractLedgerPage } from './ContractLedger/ContractLedgerPage';
import ErrorPage from './ErrorPage';
import { Home } from './Index/Home/Home';
import { PersonalLedgerPage } from './PersonalLedger/PersonalLedgerPage';
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
        path: '/oauth/discord/callback',
        element: <DiscordLoginUtility />,
      },
      {
        path: '/api-docs',
        element: <APIDocs />,
      },
      {
        path: '/ledger/contract',
        element: <ContractLedgerPage />,
      },
      {
        path: '/ledger/personal',
        element: <PersonalLedgerPage />,
      },
    ],
  },
];
