import { Marketplace } from '@Components/Orders/VerseMarket/Marketplace/Marketplace';
import { OpenOrders } from '@Components/Orders/VerseMarket/OpenOrders/OpenOrders';
import { OrderHistory } from '@Components/Orders/VerseMarket/OrderHistory/OrderHistory';
import { ContractManagerApp } from '@Components/Personal/ContractManager/ContractManagerApp';
import { ExploreApp } from '@Components/Personal/Explore/ExploreApp';
import { InventoryApp } from '@Components/Personal/Inventory/InventoryApp';
import { OverviewApp } from '@Components/Personal/Overview/OverviewApp';
import { RouteApp } from '@Components/Personal/Routes/RouteApp';
import { ShipTuning } from '@Components/Personal/Tuning/Tuning';
import { DiscordLoginUtility } from '@Utils/discordLoginUtility';
import { GoogleLoginUtility } from '@Utils/GoogleLoginUtility';
import { Outlet, RouteObject } from 'react-router-dom';

import { PopupManager } from '@/PopupManager';
import { WidgetManager } from '@/WidgetManager';

import { VLAppBar } from '../Common/Components/App/AppBar';
import { ContractLedgerApp } from '../Components/Contracts/Ledger/ContractLedgerApp';
import { AdminPage } from './Admin/AdminPage';
import { APIDocs } from './api-docs/APIDocs';
import { ContractPage } from './Contract/ContractPage';
import { DashboardPage } from './Dashboard/DashboardPage';
import ErrorPage from './ErrorPage';
import { Home } from './Index/Home/Home';
import { NotFoundPage } from './NotFound/NotFound';
import { OrgLedgerPage } from './OrgLedger/OrgLedgerPage';
import { SecureRoute } from './SecureRoute';
import { Sandbox } from './ui-sandbox/SandboxPage';
import { UserPage } from './User/UserPage';
import { VerseMarketPage } from './VerseMarket/VerseMarketPage';
import { VerseNewsPage } from './VerseNews/VerseNews';

export const routingInfo: RouteObject[] = [
  {
    path: '/',
    //element: <LegacyLandingPage/>,
    element: (
      <>
        <VLAppBar />
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
        path: '/api-docs',
        element: <APIDocs />,
      },
      {
        path: '/ledger/contracts/:selectedContractId',
        element: (
          <SecureRoute>
            <ContractPage />
          </SecureRoute>
        ),
      },
      {
        path: '/ledger/contracts',
        element: (
          <SecureRoute>
            <ContractLedgerApp />
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
        path: '/dashboard',
        element: (
          <SecureRoute>
            <DashboardPage />
          </SecureRoute>
        ),
        children: [
          {
            index: true,
            element: <OverviewApp />,
          },
          {
            index: true,
            path: 'overview',
            element: <OverviewApp />,
          },
          {
            path: '/dashboard/contracts/:selectedContractId',
            element: <ContractManagerApp />,
          },
          {
            path: 'contracts',
            element: <ContractManagerApp />,
          },
          {
            path: '/dashboard/ledger/:selectedContractId',
            element: <ContractLedgerApp />,
          },
          {
            path: 'ledger',
            element: <ContractLedgerApp />,
          },
          {
            path: '/dashboard/explore/:selectedLocationId',
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
            path: 'tuning',
            element: <ShipTuning />,
          },
          {
            path: 'ship',
            element: <ShipTuning />,
          },
          {
            path: 'orders',
            element: <InventoryApp />,
          },
        ],
      },
      {
        path: '/verse-market',
        element: (
          <SecureRoute>
            <VerseMarketPage />
          </SecureRoute>
        ),
        children: [
          {
            index: true,
            element: <Marketplace />,
          },
          {
            path: '/verse-market/marketplace/:selectedItemId',
            element: <Marketplace />,
          },
          {
            index: true,
            path: 'marketplace',
            element: <Marketplace />,
          },
          {
            path: '/verse-market/open-order/:selectedOrderId',
            element: <OpenOrders />,
          },
          {
            path: 'open-orders',
            element: <OpenOrders />,
          },
          {
            path: '/verse-market/order-history/:selectedOrderId',
            element: <OrderHistory />,
          },
          {
            path: 'order-history',
            element: <OrderHistory />,
          },
        ],
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
