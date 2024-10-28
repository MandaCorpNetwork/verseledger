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
  versionLabel: string;
  devVersion: string;
  liveVersion: string;
  /**
   * Severity Range:
   * 0. No Current Issues
   * 1. Testing For Feedback
   * 2. Low Impact UI Bugs
   * 3. Missing Logic - Minor Impact (Small QOL Features Planned Remain)
   * 4.  Logic Bug - Minor Impact (Work arounds exist | Doesn't Impede Tool Usage or Functionality)
   * 5. Missing Logic - Major Impact (Missing Planned Functionality Preventing Full Use of the Tool [Some uses available])
   * 6. Logic Bug - Major Impact (Bug Prevents Usage of the Tool | Portions of the Tool are Still usable)
   * 7. Bug - Critical Impact (Bug that Breaks the the Tool & Might impact Other features)
   * 8. Missing Logic - Critical Impact (Most of the Logic Missing Preventing Usage of the Tool)
   * 9. Planning (Tool still in the Planning/Whiteboard Stages And has Zero Usage)
   * 10. Placeholder (A planned Feature with a placeholder page)
   */
  severityCode: number;
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
    label: 'Home',
    path: '/apps/dashboard',
    icon: <HomeTwoTone />,
    versionLabel: 'Dashboard',
    devVersion: '2.0',
    liveVersion: 'N/A',
    severityCode: 5,
  },
  {
    id: 'profile',
    label: '@APP.PROFILE.LABEL',
    path: `/user/${undefined}`,
    icon: <PersonTwoTone />,
    versionLabel: 'Profile',
    disabled: true,
    devVersion: '0.2',
    liveVersion: 'N/A',
    severityCode: 8,
  },
  {
    id: 'settings',
    label: '@APP.SETTINGS.LABEL',
    path: '/settings',
    icon: <SettingsTwoTone />,
    versionLabel: 'Settings',
    devVersion: '1.2',
    liveVersion: 'N/A',
    severityCode: 5,
  },
  {
    id: 'explore',
    label: 'Explore',
    path: '/apps/explore',
    icon: <Exploration />,
    versionLabel: 'Explorer Tool',
    devVersion: '0.2',
    liveVersion: 'N/A',
    severityCode: 9,
  },
  {
    id: 'routes',
    label: 'Routes',
    path: '/apps/routes',
    icon: <RouteTwoTone />,
    versionLabel: 'Route Tool',
    devVersion: '2.0',
    liveVersion: 'N/A',
    severityCode: 8,
  },
  {
    id: 'inventory',
    label: '@APP.INVENTORY.LABEL',
    path: '/apps/inventory',
    icon: <InventoryTwoTone />,
    disabled: true,
    versionLabel: 'Inventory',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 10,
  },
  {
    id: 'ship',
    label: 'Ship',
    path: '/apps/ship',
    icon: <Vehicles />,
    versionLabel: 'Ship Manager',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 10,
  },
  {
    id: 'fleet',
    label: '@APP.FLEET.LABEL',
    path: '/apps/fleet',
    icon: <Fleet />,
    disabled: true,
    versionLabel: 'Fleet Manager',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 10,
  },
  {
    id: 'builder',
    label: '@APP.BUILDER.LABEL',
    path: '/apps/builder',
    icon: <ConstructionTwoTone />,
    disabled: true,
    versionLabel: 'Ship Builder',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 10,
  },
  {
    id: 'tuning',
    label: '@APP.TUNING.LABEL',
    path: '/apps/tuning',
    icon: <StackedBarChartTwoTone />,
    versionLabel: 'Tuning Tool',
    devVersion: '0.2',
    liveVersion: 'N/A',
    severityCode: 9,
  },
  {
    id: 'contracts',
    label: '@APP.CONTRACTS.LABEL',
    path: '/apps/contracts',
    icon: <WorkTwoTone />,
    versionLabel: 'Contract Manager',
    devVersion: '2.1',
    liveVersion: 'N/A',
    severityCode: 1,
  },
  {
    id: 'contract-ledger',
    label: '@APP.LEDGER.LABEL',
    path: '/apps/ledger',
    icon: <MenuBookTwoTone />,
    versionLabel: 'Contract Ledger',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 2,
  },
  {
    id: 'orders',
    label: '@APP.ORDERS.LABEL',
    path: '/apps/orders',
    icon: <ShoppingBasketTwoTone />,
    disabled: true,
    versionLabel: 'Order Manager',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 10,
  },
  {
    id: 'verse-market',
    label: '@APP.MARKET.LABEL',
    path: '/apps/verse-market',
    icon: <StoreTwoTone />,
    versionLabel: 'Verse Market',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 9,
  },
  {
    id: 'orgs',
    label: '@APP.ORGS.LABEL',
    path: '/orgs',
    icon: <BusinessTwoTone />,
    disabled: true,
    versionLabel: 'Org Dashboard',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 10,
  },
  {
    id: 'verse-news',
    label: '@APP.NEWS.LABEL',
    path: '/verse-news',
    icon: <NewspaperTwoTone />,
    versionLabel: 'Verse News',
    devVersion: '0.x',
    liveVersion: 'N/A',
    severityCode: 10,
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
