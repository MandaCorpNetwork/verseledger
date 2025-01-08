import {
  AccountBalanceTwoTone,
  BusinessTwoTone,
  ConstructionTwoTone,
  ExploreTwoTone,
  GroupsTwoTone,
  GroupTwoTone,
  GroupWorkTwoTone,
  HomeTwoTone,
  HubTwoTone,
  InventoryTwoTone,
  LocalMallTwoTone,
  MenuBookTwoTone,
  NewspaperTwoTone,
  PersonTwoTone,
  RouteTwoTone,
  SchoolTwoTone,
  SettingsTwoTone,
  ShoppingBasketTwoTone,
  StackedBarChartTwoTone,
  StorefrontTwoTone,
  StoreTwoTone,
  type SvgIconComponent,
  WorkTwoTone,
} from '@mui/icons-material';
import { useHasFeatureFlag } from '@Utils/Hooks/FeatureFlag';
import React from 'react';

import { Contracts, Exploration, Fleet, Rrr, Vehicles } from './CustomIcons';

export type AppListing = {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
  disabled?: boolean;
  versionLabel: string;
  version: string;
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

export const VerseLedgerVersion = '0.5.0';
export const useMasterAppList = () => {
  const news = !useHasFeatureFlag('F-news');
  const wiki = !useHasFeatureFlag('F-wiki');
  const profile = !useHasFeatureFlag('F-profile');
  const relations = !useHasFeatureFlag('F-relations');
  const explore = !useHasFeatureFlag('F-explore');
  const routing = !useHasFeatureFlag('F-routing');
  const inventory = !useHasFeatureFlag('F-inventory');
  const ship = !useHasFeatureFlag('F-ship');
  const tuning = !useHasFeatureFlag('F-tuning');
  const fleet = !useHasFeatureFlag('F-fleet');
  const orgs = !useHasFeatureFlag('F-orgs');
  const services = !useHasFeatureFlag('F-services');
  const masterAppList: AppListing[] = React.useMemo(
    () => [
      {
        id: 'verse-news',
        label: '@APP.NEWS.LABEL',
        path: '/verse-news',
        disabled: news,
        icon: NewspaperTwoTone,
        versionLabel: 'Verse News',
        version: '0.X',
        severityCode: 3,
      },
      {
        id: 'wiki',
        label: '@APP.WIKI.LABEL',
        path: '/support',
        disabled: wiki,
        icon: SchoolTwoTone,
        versionLabel: 'Wiki',
        version: '0.0.1',
        severityCode: 10,
      },
      {
        id: 'dashboard',
        label: '@APP.HOME.LABEL',
        path: '/apps/dashboard',
        icon: HomeTwoTone,
        versionLabel: 'Dashboard',
        version: '2.0',
        severityCode: 5,
      },
      {
        id: 'profile',
        label: '@APP.PROFILE.LABEL',
        path: `/user/${undefined}`,
        icon: PersonTwoTone,
        versionLabel: 'Profile',
        disabled: profile,
        version: '0.2',
        severityCode: 8,
      },
      {
        id: 'relations',
        label: '@APP.RELATIONS.LABEL',
        path: '/apps/relations',
        icon: GroupTwoTone,
        disabled: relations,
        versionLabel: 'Relations',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'settings',
        label: '@APP.SETTINGS.LABEL',
        path: '/settings',
        icon: SettingsTwoTone,
        versionLabel: 'Settings',
        version: '2.0.1',
        severityCode: 5,
      },
      {
        id: 'explore',
        label: '@APP.EXPLORE.LABEL',
        path: '/apps/explore',
        disabled: explore,
        icon: Exploration,
        versionLabel: 'Explorer Tool',
        version: '1.0.0',
        severityCode: 9,
      },
      {
        id: 'routes',
        label: '@APP.ROUTES.LABEL',
        path: '/apps/routes',
        disabled: routing,
        icon: RouteTwoTone,
        versionLabel: 'Route Tool',
        version: '2.0.5',
        severityCode: 8,
      },
      {
        id: 'inventory',
        label: '@APP.INVENTORY.LABEL',
        path: '/apps/inventory',
        icon: InventoryTwoTone,
        disabled: inventory,
        versionLabel: 'Inventory',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'ship',
        label: '@APP.SHIP.LABEL',
        path: '/apps/ship',
        icon: Vehicles,
        disabled: ship,
        versionLabel: 'Ship Manager',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'fleet',
        label: '@APP.FLEET.LABEL',
        path: '/apps/fleet',
        icon: Fleet,
        disabled: fleet,
        versionLabel: 'Fleet Manager',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'builder',
        label: '@APP.BUILDER.LABEL',
        path: '/apps/builder',
        icon: ConstructionTwoTone,
        disabled: true,
        versionLabel: 'Ship Builder',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'tuning',
        label: '@APP.TUNING.LABEL',
        path: '/apps/tuning',
        disabled: tuning,
        icon: StackedBarChartTwoTone,
        versionLabel: 'Tuning Tool',
        version: '0.2',
        severityCode: 9,
      },
      {
        id: 'contracts',
        label: '@APP.CONTRACTS.LABEL',
        path: '/apps/contracts',
        icon: Contracts,
        versionLabel: 'Contract Manager',
        version: '3.1.1',
        severityCode: 1,
      },
      {
        id: 'contract-ledger',
        label: '@APP.LEDGER.LABEL',
        path: '/apps/ledger',
        icon: MenuBookTwoTone,
        versionLabel: 'Contract Ledger',
        version: '2.5',
        severityCode: 2,
      },
      {
        id: 'contract-service',
        label: '@APP.SERVICES.LABEL',
        path: '/apps/services',
        icon: Rrr,
        versionLabel: 'Services',
        version: '0.0.1',
        severityCode: 9,
        disabled: services,
      },
      {
        id: 'orders',
        label: '@APP.ORDERS.LABEL',
        path: '/apps/orders',
        icon: ShoppingBasketTwoTone,
        disabled: true,
        versionLabel: 'Order Manager',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'verse-market',
        label: '@APP.MARKET.LABEL',
        path: '/apps/verse-market',
        disabled: true,
        icon: StoreTwoTone,
        versionLabel: 'Verse Market',
        version: '0.x',
        severityCode: 9,
      },
      {
        id: 'org-dash',
        label: '@APP.HOME.LABEL',
        path: '/orgs/dash',
        icon: BusinessTwoTone,
        disabled: orgs,
        versionLabel: 'Org Dashboard',
        version: '0.0.2',
        severityCode: 10,
      },
      {
        id: 'org-relations',
        label: '@APP.RELATIONS.LABEL',
        path: '/orgs/relations',
        icon: GroupsTwoTone,
        disabled: true,
        versionLabel: 'Org Relations',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'org-manage',
        label: '@APP.MANAGEMENT.LABEL',
        path: '/orgs/manage',
        icon: GroupWorkTwoTone,
        disabled: orgs,
        versionLabel: 'Org Management',
        version: '0.0.2',
        severityCode: 10,
      },
      {
        id: 'org-contracts',
        label: '@APP.CONTRACTS.LABEL',
        path: '/orgs/contracts',
        icon: WorkTwoTone,
        disabled: true,
        versionLabel: 'Org Contracts',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'org-pay',
        label: '@APP.PAYROLL.LABEL',
        path: '/orgs/payroll',
        icon: AccountBalanceTwoTone,
        disabled: true,
        versionLabel: 'Org Payroll',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'org-explore',
        label: '@APP.EXPLORE.LABEL',
        path: '/orgs/explore',
        icon: ExploreTwoTone,
        disabled: true,
        versionLabel: 'Org Explorer',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'org-fleet',
        label: '@APP.FLEET.LABEL',
        path: '/orgs/fleet',
        icon: Fleet,
        disabled: fleet,
        versionLabel: 'Org Fleet',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'org-find',
        label: '@APP.FINDER.LABEL',
        path: '/orgs/finder',
        icon: HubTwoTone,
        disabled: orgs,
        versionLabel: 'Org Finder',
        version: '0.0.2',
        severityCode: 10,
      },
      {
        id: 'org-orders',
        label: '@APP.ORDERS.LABEL',
        path: '/orgs/orders',
        icon: LocalMallTwoTone,
        disabled: true,
        versionLabel: 'Org Orders',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'org-market',
        label: '@APP.MARKET.LABEL',
        path: '/orgs/market',
        icon: StorefrontTwoTone,
        disabled: true,
        versionLabel: 'Org Market',
        version: '0.x',
        severityCode: 10,
      },
      {
        id: 'org-inventory',
        label: '@APP.INVENTORY.LABEL',
        path: '/orgs/inventory',
        icon: AccountBalanceTwoTone,
        disabled: true,
        versionLabel: 'Org Inventory',
        version: '0.x',
        severityCode: 10,
      },
    ],
    [
      explore,
      fleet,
      inventory,
      news,
      orgs,
      profile,
      relations,
      routing,
      services,
      ship,
      tuning,
      wiki,
    ],
  );
  return masterAppList;
};
export const splashApps: AppGroup = {
  id: 'splash',
  label: 'Splash',
  category: 'Default',
  list: ['org-dash', 'contract-ledger', 'verse-market', 'verse-news'],
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
  list: ['explore', 'routes', 'inventory', 'org-explore'],
};

export const shipApps: AppGroup = {
  id: 'ship',
  label: '@APP.SHIP.LABEL',
  category: 'ships',
  list: ['ship', 'fleet', 'builder', 'tuning', 'org-fleet'],
};

export const contractApps: AppGroup = {
  id: 'contract',
  label: '@APP.CONTRACTS.LABEL',
  category: 'contract',
  list: ['contracts', 'contract-ledger', 'org-contracts'],
};

export const orderApps: AppGroup = {
  id: 'order',
  label: '@APP.ORDERS.LABEL',
  category: 'order',
  list: ['orders', 'verse-market', 'org-orders', 'org-market'],
};

export const orgDashApps: AppGroup = {
  id: 'org-dash',
  label: '@APP.ORGS.LABEL',
  category: 'org',
  list: ['org-relations', 'org-contracts', 'org-fleet', 'org-market'],
};

export const personalApps: AppGroup = {
  id: 'personal',
  label: 'Personal',
  category: 'settings',
  list: ['profile', 'relations', 'settings', 'org-dash'],
};

//Todo: Create a Factory Component for creating AppLists and set up the Master App List with the userid for the correct User Id
