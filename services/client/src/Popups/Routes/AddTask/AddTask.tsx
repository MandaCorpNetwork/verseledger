import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { VLOptButtonGroup } from '@Common/Components/Functional/ListButtonSelection';
import { taskOpts } from '@Common/Definitions/Forms/RouteForms';
import { Box, TextField, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { Field, useForm } from '@tanstack/react-form';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

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
  const { Field, handleSubmit, state } = useForm({
    ...taskOpts,
  });
  return (
    <VLPopup data-testid="AddTask_Popup" name={POPUP_ADD_TASK} title="Add Task">
      <Box sx={{ padding: '1em', minWidth: { xs: '300px', s: '600px' } }}>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Field name="label">
            {({ state, handleChange, handleBlur }) => (
              <TextField
                data-testid="AddTask-Form__Label_Input"
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                value={state.value}
                size="small"
                color="secondary"
                label="Task Label"
                placeholder="Pickup Org Member..."
                sx={{
                  mb: '1em',
                }}
              />
            )}
          </Field>
          <Typography>Task Reason</Typography>
          <Field name="type">
            {({ state, handleChange }) => (
              <VLOptButtonGroup
                dense
                labels={typeOptions}
                onClick={(e) => handleChange(e)}
                selected={state.value}
              />
            )}
          </Field>
          <Field name="location">
            {({ handleChange }) => (
              <LocationSearch
                required
                label="Stop Location"
                onLocationSelect={(e) => handleChange(e ?? ({} as ILocation))}
                sx={{ minWidth: '200px', mt: '1em' }}
              />
            )}
          </Field>
        </form>
      </Box>
    </VLPopup>
  );
};
