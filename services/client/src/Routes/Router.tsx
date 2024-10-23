import { TempLoginCheck } from '@Common/Components/App/TempLoginCheck';
import { ContractManagerApp } from '@Components/Contracts/ContractManager/ContractManagerApp';
import { ExploreApp } from '@Components/Locations/Explore/ExploreApp';
import { InventoryApp } from '@Components/Locations/Inventory/InventoryApp';
import { RouteApp } from '@Components/Locations/Routes/RouteApp';
import { ShipTuning } from '@Components/Ships/Tuning/Tuning';
import { DashboardApp } from '@Components/User/Dashboard/DashboardApp';
import { VerseMarketPage } from '@Components/VerseMarket/VerseMarketPage';
import { DiscordLoginUtility } from '@Utils/discordLoginUtility';
import { GoogleLoginUtility } from '@Utils/GoogleLoginUtility';
import { Outlet, RouteObject } from 'react-router-dom';

import { PopupManager } from '@/PopupManager';
import { WidgetManager } from '@/WidgetManager';

import { ContractLedgerApp } from '../Components/Contracts/Ledger/ContractLedgerApp';
import { AdminPage } from './Admin/AdminPage';
import { APIDocs } from './api-docs/APIDocs';
import { AppPage } from './Apps/AppPage';
import { ContractPage } from './Contract/ContractPage';
import ErrorPage from './ErrorPage';
import { Home } from './Index/Home/Home';
import { NotFoundPage } from './NotFound/NotFound';
import { OrgLedgerPage } from './OrgLedger/OrgLedgerPage';
import { SecureRoute } from './SecureRoute';
import { UserSettings } from './Settings/UserSettings';
import { Sandbox } from './ui-sandbox/SandboxPage';
import { UserPage } from './User/UserPage';
import { VerseNewsPage } from './VerseNews/VerseNews';

export const routingInfo: RouteObject[] = [
  {
    path: '/',
    //element: <LegacyLandingPage/>,
    element: (
      <>
        <TempLoginCheck />
        <Outlet />
        <PopupManager />
        <WidgetManager />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/oauth/google/callback',
        element: <GoogleLoginUtility />,
      },
      {
        path: '/oauth/discord/callback',
        element: <DiscordLoginUtility />,
      },
      {
        path: '/settings',
        element: (
          <SecureRoute>
            <UserSettings />
          </SecureRoute>
        ),
      },
      {
        path: '/api-docs',
        element: <APIDocs />,
      },
      {
        path: '/apps',
        element: <AppPage />,
        children: [
          {
            index: true,
            element: <DashboardApp />,
          },
          {
            index: true,
            path: 'dashboard',
            element: <DashboardApp />,
          },
          {
            path: '/apps/explore/:selectedLocationId',
            element: <ExploreApp />,
          },
          {
            path: 'explore',
            element: <ExploreApp />,
          },
          {
            path: 'routes',
            element: <RouteApp />,
          },
          {
            path: 'inventory',
            element: <InventoryApp />,
          },
          {
            path: 'ship',
            element: <ShipTuning />,
          },
          {
            path: 'tuning',
            element: <ShipTuning />,
          },
          {
            path: '/apps/contracts/:selectedContractId',
            element: <ContractManagerApp />,
          },
          {
            path: 'contracts',
            element: <ContractManagerApp />,
          },
          {
            path: '/apps/ledger/:selectedContractId',
            element: <ContractLedgerApp />,
          },
          {
            path: 'ledger',
            element: <ContractLedgerApp />,
          },
          {
            path: '/apps/orders/:selectedOrderId',
            element: <VerseMarketPage />,
          },
          {
            path: 'orders',
            element: <VerseMarketPage />,
          },
          {
            path: '/apps/verse-market/:selectedOrderId',
            element: <VerseMarketPage />,
          },
          {
            path: 'verse-market',
            element: <VerseMarketPage />,
          },
        ],
      },
      {
        path: '/contract/:selectedContractId',
        element: (
          <SecureRoute>
            <ContractPage />
          </SecureRoute>
        ),
      },
      {
        path: '/user/:selectedUserId',
        element: (
          <SecureRoute allowUnverified>
            <UserPage />
          </SecureRoute>
        ),
      },
      {
        path: '/orgs',
        element: <OrgLedgerPage />,
      },
      {
        path: '/verse-news',
        element: <VerseNewsPage />,
      },
      {
        path: '/admin/:adminTab',
        element: <AdminPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/sandbox',
        element: <Sandbox />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
