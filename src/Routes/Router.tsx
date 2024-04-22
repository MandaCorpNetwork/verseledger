import { Outlet, RouteObject } from 'react-router-dom';

import { DiscordLoginUtility } from '@/Utils/discordLogin';

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
        path: '/oauth/discord/callback',
        element: <DiscordLoginUtility />,
      },
      {
        path: '/contract',
        element: <ContractLedgerTablePage />,
      },
      {
        path: '/ledger/personal',
        element: <PersonalLedgerPage />,
      },
    ],
  },
];
