import { Outlet, RouteObject } from 'react-router-dom';

import { Marketplace } from '@/Components/Orders/VerseMarket/Marketplace/Marketplace';
import { OpenOrders } from '@/Components/Orders/VerseMarket/OpenOrders/OpenOrders';
import { OrderHistory } from '@/Components/Orders/VerseMarket/OrderHistory/OrderHistory';
import { ContractManagerApp } from '@/Components/Personal/ContractManager/ContractManagerApp';
import { ExploreApp } from '@/Components/Personal/Explore/ExploreApp';
import { InventoryApp } from '@/Components/Personal/Inventory/InventoryApp';
import { OverviewApp } from '@/Components/Personal/Overview/OverviewApp';
import { RouteApp } from '@/Components/Personal/Routes/RouteApp';
import { PopupManager } from '@/PopupManager';
import { DiscordLoginUtility } from '@/Utils/discordLoginUtility';
import { WidgetManager } from '@/WidgetManager';

import { VLAppBar } from '../Common/Components/App/AppBar';
import { APIDocs } from './api-docs/APIDocs';
import { ContractPage } from './Contract/ContractPage';
import { ContractLedgerPage } from './ContractLedger/ContractLedgerPage';
import { DashboardPage } from './Dashboard/DashboardPage';
import ErrorPage from './ErrorPage';
import { Home } from './Index/Home/Home';
import { NotFoundPage } from './NotFound/NotFound';
import { SecureRoute } from './SecureRoute';
import { Sandbox } from './ui-sandbox/SandboxPage';
import { UserPage } from './User/UserPage';
import { VerseMarketPage } from './VerseMarket/VerseMarketPage';

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
            <ContractLedgerPage />
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
            path: 'marketplace',
            element: <Marketplace />,
          },
          {
            path: '/verse-market/marketplace/:selectedItemId',
            element: <Marketplace />,
          },
          {
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
