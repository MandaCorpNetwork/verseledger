import { Functions } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_ADD_TASK } from '@Popups/Routes/AddTask/AddTask';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

import { RouteOrder } from './DestinationQue';

type DestQueHeaderProps = {
  routeOrder: RouteOrder;
  setRouteOrder: React.Dispatch<React.SetStateAction<RouteOrder>>;
};

export const DestQueHeader: React.FC<DestQueHeaderProps> = ({
  routeOrder,
  setRouteOrder,
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
        <Tooltip title="Calculate Route">
          <IconButton
            size="small"
            disabled={routeOrder === 'custom'}
            // onClick={handleRouteEvaluation}
          >
            <Functions />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
