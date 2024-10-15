import './AppDock.css';

import { Exploration, Fleet, Vehicles } from '@Common/Definitions/CustomIcons';
import {
  BusinessTwoTone,
  ConstructionTwoTone,
  HomeTwoTone,
  InventoryTwoTone,
  MenuBookTwoTone,
  RouteTwoTone,
  ShoppingBasketTwoTone,
  StackedBarChartTwoTone,
  StoreTwoTone,
  WorkTwoTone,
} from '@mui/icons-material';
import { Box, Divider, Grow } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { AppIcon } from './AppIcon';
import { MoreIcon } from './MoreIcon';
import { SplashIcon } from './SplashIcon';
import { SwapIcon } from './SwapIcon';

export const AppDock: React.FC = () => {
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [dockType, setDockType] = React.useState<'org' | 'personal'>('personal');
  const [iconGroup, setIconGroup] = React.useState<IconDefinition[]>([]);
  const [key, setKey] = React.useState(0);
  const location = useLocation();

  const getIconGroup = React.useCallback(() => {
    if (showAll) {
      if (dockType === 'personal') {
        return personalAllGroup;
      } else {
        return personalAllGroup;
      }
    } else {
      switch (location.pathname) {
        case '/dashboard':
        case '/dashboard/overview':
          return dashboardGroup;
        case '/dashboard/explore':
        case '/dashboard/routes':
        case '/dashboard/inventory':
          return exploreGroup;
        case '/dashboard/ship':
        case '/dashboard/fleet':
        case '/dashboard/builder':
        case '/dashboard/tuning':
          return shipGroup;
        case '/dashboard/contracts':
        case '/dashboard/ledger':
          return contractsGroup;
        case '/dashboard/orders':
        case '/dashboard/verse-market':
          return ordersGroup;
        default:
          return dashboardGroup;
      }
    }
  }, [location.pathname, showAll, dockType]);

  React.useEffect(() => {
    const newGroup = getIconGroup();

    if (newGroup !== iconGroup) {
      setIconGroup(newGroup);
      setKey((prevKey) => prevKey + 1);
    }
  }, [getIconGroup, iconGroup]);

  const handleChangeDockType = React.useCallback(() => {
    if (dockType === 'personal') {
      setDockType('org');
    } else {
      setDockType('personal');
    }
  }, [setDockType, dockType]);

  const handleShowAll = React.useCallback(() => {
    setShowAll((prev) => !prev);
  }, [setShowAll]);
  return (
    <Box className="Dock">
      <Box>
        <SplashIcon />
        <SwapIcon dockType={dockType} setDockType={handleChangeDockType} />
      </Box>
      {dockType === 'personal' ? (
        <AppIcon label="Home" path="/dashboard/overview" icon={<HomeTwoTone />} />
      ) : (
        <AppIcon label="Orgs" path="/orgs" icon={<BusinessTwoTone />} />
      )}

      <Divider
        orientation="vertical"
        flexItem
        sx={{ opacity: '0.4', borderRightWidth: '2px' }}
      />
      <Grow in timeout={1000} key={key} style={{ transformOrigin: '0 0' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5em' }}>
          {iconGroup.map((icon) => (
            <AppIcon
              key={icon.id}
              label={icon.label}
              path={icon.path}
              icon={icon.icon}
              disabled={icon.disabled ?? false}
            />
          ))}
        </Box>
      </Grow>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <MoreIcon toggleView={handleShowAll} />
      </Box>
    </Box>
  );
};

type IconDefinition = {
  id: string;
  label: string;
  path: string;
  icon: JSX.Element;
  disabled?: boolean;
};

const dashboardGroup: IconDefinition[] = [
  { id: 'explore', label: 'Explore', path: '/dashboard/explore', icon: <Exploration /> },
  { id: 'ship', label: 'Ship', path: '/dashboard/ship', icon: <Vehicles /> },
  {
    id: 'contracts',
    label: 'Contracts',
    path: '/dashboard/contracts',
    icon: <WorkTwoTone />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/dashboard/orders',
    icon: <ShoppingBasketTwoTone />,
  },
];

const exploreGroup: IconDefinition[] = [
  { id: 'explore', label: 'Explore', path: '/dashboard/explore', icon: <Exploration /> },
  { id: 'routes', label: 'Routes', path: '/dashboard/routes', icon: <RouteTwoTone /> },
  {
    id: 'inventory',
    label: 'Inventory',
    path: '/dashboard/inventory',
    icon: <InventoryTwoTone />,
    disabled: true,
  },
];

const shipGroup: IconDefinition[] = [
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
];

const contractsGroup: IconDefinition[] = [
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
];

const ordersGroup: IconDefinition[] = [
  {
    id: 'orders',
    label: 'Orders',
    path: '/dashboard/orders',
    icon: <ShoppingBasketTwoTone />,
  },
  {
    id: 'verse-market',
    label: 'Ledger',
    path: '/dashboard/verse-market',
    icon: <StoreTwoTone />,
  },
];

const personalAllGroup: IconDefinition[] = [
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
    label: 'Ledger',
    path: '/dashboard/verse-market',
    icon: <StoreTwoTone />,
  },
];

// const orgLedgerGroup = [];
