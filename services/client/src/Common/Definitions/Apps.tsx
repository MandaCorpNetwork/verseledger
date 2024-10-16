import {
  BusinessTwoTone,
  ConstructionTwoTone,
  HomeTwoTone,
  InventoryTwoTone,
  MenuBookTwoTone,
  NewspaperTwoTone,
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
  { id: 'dashboard', label: 'Home', path: '/dashboard/overview', icon: <HomeTwoTone /> },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <SettingsTwoTone />,
    disabled: true,
  },
  { id: 'explore', label: 'Explore', path: '/dashboard/explore', icon: <Exploration /> },
  { id: 'routes', label: 'Routes', path: '/dashboard/routes', icon: <RouteTwoTone /> },
  {
    id: 'inventory',
    label: 'Inventory',
    path: '/dashboard/inventory',
    icon: <InventoryTwoTone />,
    disabled: true,
  },
  { id: 'ship', label: 'Ship', path: '/dashboard/ship', icon: <Vehicles /> },
  {
    id: 'fleet',
    label: 'Fleet',
    path: '/dashboard/fleet',
    icon: <Fleet />,
    disabled: true,
  },
  {
    id: 'builder',
    label: 'Builder',
    path: '/dashboard/builder',
    icon: <ConstructionTwoTone />,
    disabled: true,
  },
  {
    id: 'tuning',
    label: 'Tuning',
    path: '/dashboard/tuning',
    icon: <StackedBarChartTwoTone />,
  },
  {
    id: 'contracts',
    label: 'Contracts',
    path: '/dashboard/contracts',
    icon: <WorkTwoTone />,
  },
  {
    id: 'contract-ledger',
    label: 'Ledger',
    path: '/dashboard/ledger',
    icon: <MenuBookTwoTone />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/dashboard/orders',
    icon: <ShoppingBasketTwoTone />,
  },
  {
    id: 'verse-market',
    label: 'Market',
    path: '/dashboard/verse-market',
    icon: <StoreTwoTone />,
  },
  {
    id: 'orgs',
    label: 'Orgs',
    path: '/orgs',
    icon: <BusinessTwoTone />,
  },
  {
    id: 'verse-news',
    label: 'News',
    path: '/verse-news',
    icon: <NewspaperTwoTone />,
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
  label: 'Exploration',
  category: 'locations',
  list: ['explore', 'routes', 'inventory'],
};

export const shipApps: AppGroup = {
  id: 'ship',
  label: 'Ships',
  category: 'ships',
  list: ['ship', 'fleet', 'builder', 'tuning'],
};

export const contractApps: AppGroup = {
  id: 'contract',
  label: 'Contracts',
  category: 'contract',
  list: ['contracts', 'contract-ledger'],
};

export const orderApps: AppGroup = {
  id: 'order',
  label: 'Orders',
  category: 'order',
  list: ['orders', 'verse-market'],
};

export const orgApps: AppGroup = {
  id: 'org',
  label: 'Organizations',
  category: 'org',
  list: ['orgs'],
};
