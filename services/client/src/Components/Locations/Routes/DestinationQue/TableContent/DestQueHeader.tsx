import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { POPUP_IMPORT_FILE } from '@Popups/Import/ImportFile';
import { POPUP_ADD_TASK } from '@Popups/Routes/AddTask/AddTask';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { startRoute } from '@Redux/Slices/Routes/actions/activeRoute.action';
import { routingActive } from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';
import { IDestination, ITaskStatus } from 'vl-shared/src/schemas/RoutesSchema';

import { RouteOrder } from '../DestinationQue';

type DestQueHeaderProps = {
  routeOrder: RouteOrder;
  setRouteOrder: React.Dispatch<React.SetStateAction<RouteOrder>>;
  destinations: IDestination[];
};

export const DestQueHeader: React.FC<DestQueHeaderProps> = ({
  routeOrder,
  setRouteOrder,
  destinations,
}) => {
  const dispatch = useAppDispatch();
  const handleRouteOrder = React.useCallback(
    (value: 'custom' | 'distance' | 'fuel') => {
      setRouteOrder(value);
    },
    [setRouteOrder],
  );
  const openAddTask = React.useCallback(() => {
    dispatch(openPopup(POPUP_ADD_TASK));
  }, [dispatch]);

  const routeActive = useAppSelector(routingActive);

  const handleStartRoute = React.useCallback(() => {
    const first = destinations[0];
    const startTask = first.tasks.find((task) => task.type === 'checkpoint');
    const scuLoad = startTask?.scu ?? 0;
    const destination = {
      ...first,
      tasks: first.tasks.map((task) =>
        task.id === startTask?.id
          ? { ...task, status: 'COMPLETED' as ITaskStatus }
          : task,
      ),
    };
    dispatch(startRoute({ destination, scuLoad }));
  }, [destinations, dispatch]);

  const exportDestinations = React.useCallback(() => {
    const json = JSON.stringify(destinations, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'VerseLedgerRoute.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [destinations]);

  const handleOpenImport = React.useCallback(() => {
    dispatch(openPopup(POPUP_IMPORT_FILE, { title: 'Route' }));
  }, [dispatch]);

  return (
    <div
      data-testid="RouteTool-DestinationList__TitleBar_Wrapper"
      style={{
        display: 'flex',
        gap: '1em',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography data-testid="RouteTool__DestinationList_Title" variant="h5">
        Destinations
      </Typography>
      <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
        {!routeActive && (
          <Button
            variant="contained"
            size="small"
            onClick={handleStartRoute}
            disabled={destinations.length < 1}
          >
            Start Route
          </Button>
        )}
        {routeActive && (
          <Button variant="contained" size="small" disabled>
            Stop Route
          </Button>
        )}
        <Button variant="contained" size="small" onClick={handleOpenImport} disabled>
          Import
        </Button>
        <Button variant="contained" size="small" onClick={exportDestinations}>
          Export
        </Button>
        <Button variant="contained" size="small" disabled>
          Save
        </Button>
        <Button variant="contained" size="small" onClick={openAddTask}>
          Add Stop
        </Button>
        <FormControl>
          <InputLabel color="secondary">Route Order</InputLabel>
          <Select
            labelId="Route Order"
            label="Route Order"
            value={routeOrder}
            size="small"
            color="secondary"
            onChange={(e) =>
              handleRouteOrder(e.target.value as 'custom' | 'distance' | 'fuel')
            }
          >
            <MenuItem value={'custom'}>Custom</MenuItem>
            <MenuItem value={'distance'}>Distance</MenuItem>
            <MenuItem value={'fuel'} disabled>
              Fuel
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
