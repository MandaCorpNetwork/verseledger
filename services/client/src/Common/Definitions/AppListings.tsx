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
  { id: 'dashboard', label: 'Home', path: '/apps/dashboard', icon: <HomeTwoTone /> },
  {
    id: 'profile',
    label: 'Profile',
    path: `/user/${undefined}`,
    icon: <PersonTwoTone />,
    disabled: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <SettingsTwoTone />,
  },
  { id: 'explore', label: 'Explore', path: '/apps/explore', icon: <Exploration /> },
  { id: 'routes', label: 'Routes', path: '/apps/routes', icon: <RouteTwoTone /> },
  {
    id: 'inventory',
    label: 'Inventory',
    path: '/apps/inventory',
    icon: <InventoryTwoTone />,
    disabled: true,
  },
  { id: 'ship', label: 'Ship', path: '/apps/ship', icon: <Vehicles /> },
  {
    id: 'fleet',
    label: 'Fleet',
    path: '/apps/fleet',
    icon: <Fleet />,
    disabled: true,
  },
  {
    id: 'builder',
    label: 'Builder',
    path: '/apps/builder',
    icon: <ConstructionTwoTone />,
    disabled: true,
  },
  {
    id: 'tuning',
    label: 'Tuning',
    path: '/apps/tuning',
    icon: <StackedBarChartTwoTone />,
  },
  {
    id: 'contracts',
    label: 'Contracts',
    path: '/apps/contracts',
    icon: <WorkTwoTone />,
  },
  {
    id: 'contract-ledger',
    label: 'Ledger',
    path: '/apps/ledger',
    icon: <MenuBookTwoTone />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/apps/orders',
    icon: <ShoppingBasketTwoTone />,
    disabled: true,
  },
  {
    id: 'verse-market',
    label: 'Market',
    path: '/apps/verse-market',
    icon: <StoreTwoTone />,
    disabled: true,
  },
  {
    id: 'orgs',
    label: 'Orgs',
    path: '/orgs',
    icon: <BusinessTwoTone />,
    disabled: true,
  },
  {
    id: 'verse-news',
    label: 'News',
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

export const personalApps: AppGroup = {
  id: 'personal',
  label: 'Personal',
  category: 'settings',
  list: ['profile', 'settings', 'orgs', 'news'],
};

//Todo: Create a Factory Component for creating AppLists and set up the Master App List with the userid for the correct User Id
