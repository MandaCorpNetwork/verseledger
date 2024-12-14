import { Scu, Scu3d } from '@CommonLegacy/DefinitionsLegacy/CustomIcons';
import { Functions } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { replaceDestinations } from '@Redux/Slices/Routes/actions/destination.action';
import { selectTasks } from '@Redux/Slices/Routes/routes.selectors';
import { useForm } from '@tanstack/react-form';
import { numericalFilter } from '@Utils/numericFilter';
import type React from 'react';

import { getEfficientDistancePath, type MappedLocation } from '../../RouteUtilities';

type DestinationEffFormProps = {
  locationTree: Map<string, MappedLocation>;
};

export const DestinationEffForm: React.FC<DestinationEffFormProps> = (props) => {
  const { locationTree } = props;
  const taskArray = useAppSelector(selectTasks);
  const currentLocation = useAppSelector(selectUserLocation);
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: {
      currentLoad: 0,
      maxLoad: 0,
    },
    onSubmit: ({ value }) => {
      const newDestinations = getEfficientDistancePath(
        taskArray,
        locationTree,
        value.maxLoad,
        value.currentLoad,
        currentLocation,
      );
      dispatch(replaceDestinations(newDestinations));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
    >
      <form.Field name="currentLoad">
        {(field) => (
          <TextField
            size="small"
            label="Current Load"
            value={field.state.value !== 0 ? field.state.value.toLocaleString() : ''}
            onChange={(e) =>
              field.handleChange(numericalFilter(e.currentTarget.value) ?? 0)
            }
            onBlur={field.handleBlur}
            slotProps={{
              input: {
                endAdornment: <Scu />,
              },
            }}
          />
        )}
      </form.Field>
      <form.Field name="maxLoad">
        {(field) => (
          <TextField
            size="small"
            label="Max Load"
            value={field.state.value !== 0 ? field.state.value.toLocaleString() : ''}
            onChange={(e) =>
              field.handleChange(numericalFilter(e.currentTarget.value) ?? 0)
            }
            onBlur={field.handleBlur}
            slotProps={{
              input: {
                endAdornment: <Scu3d />,
              },
            }}
          />
        )}
      </form.Field>
      <Button
        variant="contained"
        endIcon={<Functions />}
        size="small"
        onClick={form.handleSubmit}
        sx={{ px: '2em' }}
      >
        Calculate
      </Button>
    </form>
  );
};
