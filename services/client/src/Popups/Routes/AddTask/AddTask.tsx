/* eslint-disable react/no-children-prop */
import { useSoundEffect } from '@Audio/AudioManager';
import { LocationSearch } from '@CommonLegacy/Components/App/LocationSearch';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
import { VLOptButtonGroup } from '@CommonLegacy/Components/Functional/ListButtonSelection';
import { TextField, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { updateDestinations } from '@Redux/Slices/Routes/actions/destination.action';
import { addTasks } from '@Redux/Slices/Routes/actions/task.action';
import { useForm } from '@tanstack/react-form';
import { createLocalID } from '@Utils/createId';
import { enqueueSnackbar } from 'notistack';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const POPUP_ADD_TASK = 'add_stop';

const typeOptions: string[] = [
  'Refuel',
  'Rearm',
  'Repair',
  'Crew Stop',
  'Food',
  'Medical',
  'Checkpoint',
  'Other',
];

export const AddTaskPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const form = useForm({
    defaultValues: {
      id: createLocalID('T'),
      type: '',
      label: '',
      location: {} as ILocation,
      status: 'PENDING',
      user: undefined,
    },
    onSubmit: ({ value }) => {
      const payload = {
        ...value,
      } as ITask;

      sound.playSound('loading');
      dispatch(addTasks([payload]));
      const newDestination = {
        id: createLocalID('D'),
        stopNumber: 0,
        visited: false,
        reason: payload.type,
        tasks: [payload],
        location: payload.location,
      };
      dispatch(updateDestinations([newDestination]));
      dispatch(closePopup(POPUP_ADD_TASK));
      enqueueSnackbar('Added Task', { variant: 'success' });
    },
  });

  return (
    <VLPopup
      data-testid="AddTask_Popup"
      name={POPUP_ADD_TASK}
      title="Add Task"
      onSubmit={form.handleSubmit}
      onCancel={() => {}}
      sx={{ minWidth: { xs: '300px', md: '600px' } }}
    >
      <FeatureDisplay
        data-testid="AddTask-Popup_Form_Wrapper"
        sx={{
          p: '1em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form
          data-testid="AddTask-Popup__Tanstack_Form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1em',
          }}
        >
          <div style={{ minHeight: '20px' }}>
            <Typography
              variant="body2"
              sx={{ color: 'info.light', textShadow: '2px 2px 4px rgba(0,0,0)' }}
            >
              Complete Form to create a Custom Stop
            </Typography>
          </div>
          <div
            data-testid="AddTask-Popup-Form__Location_Wrapper"
            style={{
              minHeight: '150px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <form.Field
              name="label"
              data-testid="AddTask-Popup-Form__Label_Field"
              validators={{
                onChange: ({ value }) =>
                  (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
                onBlur: ({ value }) =>
                  (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
              }}
              children={(field) => (
                <TextField
                  data-testid="AddTask-Form__Label_Input"
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  value={field.state.value}
                  size="small"
                  color="secondary"
                  label="Task Label"
                  placeholder="Pickup Org Member..."
                  required
                  error={field.state.meta.errors.length > 0}
                  sx={{ mb: '1em' }}
                />
              )}
            />

            <form.Field
              data-testid="AddTask-Popup-Form-Location__Field"
              name="location"
              validators={{
                onChange: ({ value }) =>
                  value.id != null ? undefined : 'Select Location',
              }}
              children={(field) => (
                <LocationSearch
                  // required
                  // label="Stop Location"
                  onLocationSelect={(e) => field.handleChange(e ?? ({} as ILocation))}
                  sx={{ minWidth: '200px', mb: '1em' }}
                />
              )}
            />
            <form.Subscribe
              data-testid="AddTask-Popup-Form-Location__LocationChip"
              selector={(state) => [state.values.location]}
              children={([location]) => (
                <>
                  {location.id && location.id.length > 0 && (
                    <LocationChip locationId={location.id} sx={{ maxWidth: '150px' }} />
                  )}
                </>
              )}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>Task Reason*</Typography>
            <form.Field
              name="type"
              validators={{
                onChange: ({ value }) =>
                  typeOptions.includes(value) ? undefined : 'Select a Reason',
              }}
              children={(field) => (
                <VLOptButtonGroup
                  dense
                  labels={typeOptions}
                  onClick={(e) => field.handleChange(e)}
                  selected={field.state.value}
                />
              )}
            />
          </div>
        </form>
      </FeatureDisplay>
    </VLPopup>
  );
};
