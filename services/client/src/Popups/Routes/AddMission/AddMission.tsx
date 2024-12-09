/* eslint-disable react/no-children-prop */
import { useSoundEffect } from '@Audio/AudioManager';
import { LocationSearch } from '@CommonLegacy/Components/App/LocationSearch';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { SCUField } from '@CommonLegacy/Components/TextFields/SCUField';
import { RemoveCircle } from '@mui/icons-material';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { updateDestinations } from '@Redux/Slices/Routes/actions/destination.action';
import { addTasks } from '@Redux/Slices/Routes/actions/task.action';
import { selectDestinations } from '@Redux/Slices/Routes/routes.selectors';
import { useForm } from '@tanstack/react-form';
import { createLocalID } from '@Utils/createId';
import { enqueueSnackbar } from 'notistack';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

import { createDestinations, createTaskArray } from './AddMissionUtils';
export const POPUP_CREATE_MISSION = 'create_mission';

export const AddMissionPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const destinations = useAppSelector(selectDestinations);

  const form = useForm({
    defaultValues: {
      missionId: createLocalID('M'),
      missionLabel: '',
      tasks: [
        {
          id: createLocalID('T'),
          relationId: createLocalID('T'),
          label: '',
          pickup: {} as ILocation,
          dropoffs: [{ dropoff: {} as ILocation, scu: 0 }],
          item: 'Unknown',
          scu: 0,
        },
      ],
    },
    onSubmit: ({ value }) => {
      sound.playSound('loading');
      const tasks = createTaskArray(value);
      console.log('Add Mission Tasks', tasks);
      const updatedDestinations = createDestinations(destinations, tasks as ITask[]);
      console.log('Add Mission Dests', updateDestinations);
      //TODO: Consolidation Logic When Adding Missions
      dispatch(updateDestinations(updatedDestinations));
      dispatch(addTasks(tasks as ITask[]));
      dispatch(closePopup(POPUP_CREATE_MISSION));
      enqueueSnackbar('Mission Created', { variant: 'success' });
    },
  });

  const newPickup = {
    id: createLocalID('T'),
    relationId: createLocalID('T'),
    label: '',
    pickup: {} as ILocation,
    dropoffs: [{ dropoff: {} as ILocation, scu: 0 }],
    item: 'Unknown',
    scu: 0,
  };

  const newDropoff = { dropoff: {} as ILocation, scu: 0 };

  return (
    <VLPopup
      data-testid="CreateMission_Form"
      name={POPUP_CREATE_MISSION}
      title="Create Mission"
      submitText="Create"
      onSubmit={form.handleSubmit}
      sx={{
        minWidth: '800px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <Typography
          align="center"
          variant="tip"
          sx={{ px: '1em', fontSize: '1em', mx: 'auto' }}
        >
          Create a mission for Routing.
        </Typography>
      </div>
      <form
        data-testid="CreateMission-Form__About_Wrapper"
        style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/** MISSION HEADER */}
        <form.Field
          name="missionLabel"
          data-testid="CreateMission-Form__MissionLabel_Field"
          validators={{
            onChange: ({ value }) =>
              (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
            onBlur: ({ value }) =>
              (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
          }}
          children={(field) => (
            <TextField
              data-testid="CreateMission-Form__MissionLabel_Input"
              label="Mission Label"
              size="medium"
              color="secondary"
              required
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              sx={{
                maxWidth: '150px',
                mb: '2em',
              }}
            />
          )}
        />
        <FeatureDisplay
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '600px',
            overflow: 'auto',
            p: '1em',
          }}
        >
          {/** TASKS ARRAY */}
          <form.Field
            name="tasks"
            data-testid="CreateMission-Form__Objective_Wrapper"
            mode="array"
          >
            {(field) => (
              <div>
                {field.state.value.map((_, i) => {
                  return (
                    <ComponentContainer
                      key={i}
                      sx={{ p: '1em', gap: '0.5em', my: '0.5em' }}
                    >
                      <div>
                        {/** TASK MAP */}
                        <form.Field
                          name={`tasks[${i}].label`}
                          validators={{
                            onChange: ({ value }) =>
                              (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
                            onBlur: ({ value }) =>
                              (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
                          }}
                          children={(subField) => (
                            <TextField
                              data-testid="CreateMission-Form-Objective__PackageLabel_Field"
                              label="Label"
                              size="small"
                              color="secondary"
                              value={subField.state.value}
                              onChange={(e) => subField.handleChange(e.target.value)}
                              onBlur={subField.handleBlur}
                              required
                              sx={{
                                maxWidth: '130px',
                              }}
                            />
                          )}
                        />
                      </div>
                      <div style={{ padding: '0 1em' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          Pickup Info
                        </Typography>
                        <ComponentDisplay
                          sx={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            px: '0.2em',
                            py: '0.5em',
                          }}
                        >
                          <form.Field
                            name={`tasks[${i}].pickup`}
                            validators={{
                              onChange: ({ value }) =>
                                value.id != null ? undefined : 'Select Location',
                            }}
                            children={(subField) => (
                              <LocationSearch
                                onLocationSelect={(e) => {
                                  subField.handleChange(e ?? ({} as ILocation));
                                  console.log(subField, e);
                                }}
                                // label="Pickup Location"
                                // required
                                sx={{ minWidth: '175px' }}
                              />
                            )}
                          />
                          <form.Field
                            name={`tasks[${i}].item`}
                            validators={{
                              onChange: ({ value }) =>
                                (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
                              onBlur: ({ value }) =>
                                (value?.length ?? 0) > 0 ? undefined : 'Enter a Label',
                            }}
                            children={(subField) => (
                              <TextField
                                data-testid="CreateMission-Form-Objective__Contents_Field"
                                label="Contents"
                                size="small"
                                color="secondary"
                                required
                                value={subField.state.value}
                                onChange={(e) => subField.handleChange(e.target.value)}
                              />
                            )}
                          />
                          <form.Field
                            name={`tasks[${i}].scu`}
                            children={(subField) => (
                              <SCUField
                                value={subField.state.value}
                                onChange={(e) => subField.handleChange(e)}
                                onBlur={subField.handleBlur}
                              />
                            )}
                          />
                        </ComponentDisplay>
                        <div>
                          {/** DROPOFFS MAP */}
                          <form.Field
                            name={`tasks[${i}].dropoffs`}
                            data-testid="CreateMission-Form__Objective_Wrapper"
                            mode="array"
                          >
                            {(subField) => (
                              <div>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  Dropoff Info
                                </Typography>
                                {subField.state.value.map((_, j) => {
                                  return (
                                    <ComponentDisplay
                                      key={j}
                                      sx={{
                                        flexDirection: 'row',
                                        width: 'fit-content',
                                        ml: '5%',
                                        gap: '1em',
                                        px: '0.5em',
                                        py: '0.5em',
                                        my: '0.5em',
                                      }}
                                    >
                                      <IconButton
                                        sx={{
                                          p: 0,
                                          transition: 'transform 0.2s ease',
                                          '&:hover': { transform: 'scale(1.1)' },
                                        }}
                                        onClick={() => subField.removeValue(j)}
                                      >
                                        <RemoveCircle color="warning" />
                                      </IconButton>
                                      <form.Field
                                        name={`tasks[${i}].dropoffs[${j}].dropoff`}
                                        validators={{
                                          onChange: ({ value }) =>
                                            value.id != null
                                              ? undefined
                                              : 'Select Location',
                                        }}
                                        children={(subField) => (
                                          <LocationSearch
                                            onLocationSelect={(e) => {
                                              subField.handleChange(
                                                e ?? ({} as ILocation),
                                              );
                                              console.log(subField, e);
                                            }}
                                            // label="Pickup Location"
                                            // required
                                            sx={{ minWidth: '175px' }}
                                          />
                                        )}
                                      />
                                      <form.Field
                                        name={`tasks[${i}].dropoffs[${j}].scu`}
                                        children={(subField) => (
                                          <SCUField
                                            value={subField.state.value}
                                            onChange={(e) => subField.handleChange(e)}
                                            onBlur={subField.handleBlur}
                                          />
                                        )}
                                      />
                                    </ComponentDisplay>
                                  );
                                })}
                                <div
                                  style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-around',
                                    marginTop: '1em',
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => subField.pushValue(newDropoff)}
                                  >
                                    Add Dropoff
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => field.removeValue(i)}
                                  >
                                    Remove Objective
                                  </Button>
                                </div>
                              </div>
                            )}
                          </form.Field>
                        </div>
                      </div>
                    </ComponentContainer>
                  );
                })}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => field.pushValue(newPickup)}
                  sx={{ mt: '1em' }}
                >
                  Add Pickup
                </Button>
              </div>
            )}
          </form.Field>
        </FeatureDisplay>
      </form>
    </VLPopup>
  );
};
