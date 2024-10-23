import {
  BusinessTwoTone,
  ConstructionTwoTone,
  HomeTwoTone,
  InventoryTwoTone,
  MenuBookTwoTone,
  NewspaperTwoTone,
  PersonTwoTone,
  RouteTwoTone,
  SettingsTwoTone,
  ShoppingBasketTwoTone,
  StackedBarChartTwoTone,
  StoreTwoTone,
  WorkTwoTone,
} from '@mui/icons-material';

import { Exploration, Fleet, Vehicles } from './CustomIcons';

export type AppListing = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

export type AppGroup = {
  id: string;
  label: string;
  category: string;
  list: string[];
};

export const masterAppList: AppListing[] = [
  {
    id: 'dashboard',
    label: '@APP.HOME.LABEL',
    path: '/apps/dashboard',
    icon: <HomeTwoTone />,
  },
  {
    id: 'profile',
    label: '@APP.PROFILE.LABEL',
    path: `/user/${undefined}`,
    icon: <PersonTwoTone />,
    disabled: true,
  },
  {
    id: 'settings',
    label: '@APP.SETTINGS.LABEL',
    path: '/settings',
    icon: <SettingsTwoTone />,
  },
  {
    id: 'explore',
    label: '@APP.EXPLORE.LABEL',
    path: '/apps/explore',
    icon: <Exploration />,
  },
  {
    id: 'routes',
    label: '@APP.ROUTES.LABEL',
    path: '/apps/routes',
    icon: <RouteTwoTone />,
  },
  {
    id: 'inventory',
    label: '@APP.INVENTORY.LABEL',
    path: '/apps/inventory',
    icon: <InventoryTwoTone />,
    disabled: true,
  },
  { id: 'ship', label: '@APP.SHIP.LABEL', path: '/apps/ship', icon: <Vehicles /> },
  {
    id: 'fleet',
    label: '@APP.FLEET.LABEL',
    path: '/apps/fleet',
    icon: <Fleet />,
    disabled: true,
  },
  {
    id: 'builder',
    label: '@APP.BUILDER.LABEL',
    path: '/apps/builder',
    icon: <ConstructionTwoTone />,
    disabled: true,
  },
  {
    id: 'tuning',
    label: '@APP.TUNING.LABEL',
    path: '/apps/tuning',
    icon: <StackedBarChartTwoTone />,
  },
  {
    id: 'contracts',
    label: '@APP.CONTRACTS.LABEL',
    path: '/apps/contracts',
    icon: <WorkTwoTone />,
  },
  {
    id: 'contract-ledger',
    label: '@APP.LEDGER.LABEL',
    path: '/apps/ledger',
    icon: <MenuBookTwoTone />,
  },
  {
    id: 'orders',
    label: '@APP.ORDERS.LABEL',
    path: '/apps/orders',
    icon: <ShoppingBasketTwoTone />,
    disabled: true,
  },
  {
    id: 'verse-market',
    label: '@APP.MARKET.LABEL',
    path: '/apps/verse-market',
    icon: <StoreTwoTone />,
    disabled: true,
  },
  {
    id: 'orgs',
    label: '@APP.ORGS.LABEL',
    path: '/orgs',
    icon: <BusinessTwoTone />,
    disabled: true,
  },
  {
    id: 'verse-news',
    label: '@APP.NEWS.LABEL',
    path: '/verse-news',
    icon: <NewspaperTwoTone />,
    disabled: true,
  },
];

export const splashApps: AppGroup = {
  id: 'splash',
  label: 'Splash',
  category: 'Default',
  list: ['orgs', 'contract-ledger', 'verse-market', 'verse-news'],
};

export const dashApps: AppGroup = {
  id: 'dash',
  label: 'Dashboard',
  category: 'Default',
  list: ['explore', 'ship', 'contracts', 'orders'],
};

export const exploreApps: AppGroup = {
  id: 'explore',
  label: '@APP.EXPLORE.LABEL',
  category: 'locations',
  list: ['explore', 'routes', 'inventory'],
};

export const shipApps: AppGroup = {
  id: 'ship',
  label: '@APP.SHIP.LABEL',
  category: 'ships',
  list: ['ship', 'fleet', 'builder', 'tuning'],
};

export const contractApps: AppGroup = {
  id: 'contract',
  label: '@APP.CONTRACTS.LABEL',
  category: 'contract',
  list: ['contracts', 'contract-ledger'],
};

export const orderApps: AppGroup = {
  id: 'order',
  label: '@APP.ORDERS.LABEL',
  category: 'order',
  list: ['orders', 'verse-market'],
};

export const orgApps: AppGroup = {
  id: 'org',
  label: '@APP.ORGS.LABEL',
  category: 'org',
  list: ['orgs'],
};

export const personalApps: AppGroup = {
  id: 'personal',
  label: 'Personal',
  category: 'settings',
  list: ['profile', 'settings', 'orgs', 'news'],
};

//Todo: Create a Factory Component for creating AppLists and set up the Master App List with the userid for the correct User Id
