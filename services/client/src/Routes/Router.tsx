import { AppDockRenderer } from '@CommonLegacy/AppDockV3/AppDockContainerV2';
import { LoginCheck } from '@CommonLegacy/Components/App/TempLoginCheck';
import { ContractManagerApp } from '@ComponentsLegacy/Contracts/ContractManager/ContractManagerApp';
import { ContractLedgerApp } from '@ComponentsLegacy/Contracts/Ledger/ContractLedgerApp';
import { ExploreApp } from '@ComponentsLegacy/Locations/Explore/ExploreApp';
import { InventoryApp } from '@ComponentsLegacy/Locations/Inventory/InventoryApp';
import { RouteApp } from '@ComponentsLegacy/Locations/Routes/RouteApp';
import { OrgDash } from '@ComponentsLegacy/Orgs/Dash/OrgDash';
import { OrgFinder } from '@ComponentsLegacy/Orgs/Finder/OrgFinder';
import { OrgManager } from '@ComponentsLegacy/Orgs/Management/OrgManager';
import { OrgPage } from '@ComponentsLegacy/Orgs/Page/OrgPage';
import { ShipTuning } from '@ComponentsLegacy/Ships/Tuning/Tuning';
import { DashboardApp } from '@ComponentsLegacy/User/Dashboard/DashboardApp';
import { VerseMarketPage } from '@ComponentsLegacy/VerseMarket/VerseMarketPage';
import { DiscordLoginUtility } from '@Utils/discordLoginUtility';
import { GoogleLoginUtility } from '@Utils/GoogleLoginUtility';
import { Outlet, type RouteObject } from 'react-router-dom';

import { PopupManager } from '@/PopupManager';
import { WidgetManager } from '@/WidgetManager';

import { AdminPage } from './Admin/AdminPage';
import { APIDocs } from './api-docs/APIDocs';
import { AppPage } from './Apps/AppPage';
import { ContractPage } from './Contract/ContractPage';
import ErrorPage from './ErrorPage';
import { Home } from './Index/Home/Home';
import { LicensePage } from './License/LicensePage';
import { NotFoundPage } from './NotFound/NotFound';
import { OrgLedgerPage } from './OrgLedger/OrgLedgerPage';
import { SecureRoute } from './SecureRoute';
import { UserSettings } from './Settings/UserSettings';
import { SupportPage } from './Support/SupportPage';
import { Sandbox } from './ui-sandbox/SandboxPage';
import { UserPage } from './User/UserPage';
import { VerseNewsPage } from './VerseNews/VerseNews';

export const routingInfo: RouteObject[] = [
  {
    path: '/',
    //element: <LegacyLandingPage/>,
    element: (
      <>
        <LoginCheck />
        <AppDockRenderer />
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
        path: '/settings/:tab',
        element: (
          <SecureRoute>
            <UserSettings />
          </SecureRoute>
        ),
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
        path: '/license',
        element: <LicensePage />,
      },
      {
        path: '/api-docs',
        element: <APIDocs />,
      },
      {
        path: '/apps',
        element: (
          <SecureRoute>
            <AppPage />
          </SecureRoute>
        ),
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
        children: [
          {
            index: true,
            element: <OrgDash />,
          },
          {
            path: '/orgs/dash/:selectedOrgId',
            element: <OrgDash />,
          },
          {
            index: true,
            path: 'dash',
            element: <OrgDash />,
          },
          {
            path: '/orgs/finder/:selectedOrgId',
            element: <OrgPage />,
          },
          {
            path: 'finder',
            element: <OrgFinder />,
          },
          {
            path: '/orgs/manage/:selectedOrgId',
            element: <OrgManager />,
          },
          {
            path: 'manage',
            element: <OrgManager />,
          },
        ],
      },
      {
        path: '/verse-news',
        element: <VerseNewsPage />,
      },
      {
        path: '/support',
        element: <SupportPage />,
        children: [
          {
            path: '/support/:page',
            element: <SupportPage />,
          },
          {
            path: '/support/:page/:subpage',
            element: <SupportPage />,
          },
        ],
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
