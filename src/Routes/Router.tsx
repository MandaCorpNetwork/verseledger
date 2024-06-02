import { Outlet, RouteObject } from 'react-router-dom';

import { DiscordLoginUtility } from '@/Utils/discordLoginUtility';

import { VLAppBar } from '../Common/Components/App/AppBar';
import ErrorPage from './ErrorPage';
import { ContractLedgerPage } from './Index/ContractLedger/Ledger/ContractLedgerPage';
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
