/* eslint-disable react/no-children-prop */
import { useSoundEffect } from '@Audio/AudioManager';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { missionOpts } from '@Common/Definitions/Forms/RouteForms';
import { Close } from '@mui/icons-material';
import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectDestinations } from '@Redux/Slices/Routes/routes.selectors';
import { useForm } from '@tanstack/react-form';

import { MissionObjectiveField } from './MissionObjectiveField';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const POPUP_CREATE_MISSION = 'create_mission';

export const AddMissionPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const destinations = useAppSelector(selectDestinations);
  const form = useForm({
    ...missionOpts,
  });
  return (
    <VLPopup
      data-testid="CreateMission_Form"
      name={POPUP_CREATE_MISSION}
      title="Create Mission"
      submitText="Create"
      sx={{
        minWidth: '800px',
      }}
    >
      <Typography
        align="center"
        variant="tip"
        sx={{ px: '1em', fontSize: '.9em', mx: 'auto' }}
      >
        Create a mission for Routing.
      </Typography>
      <form
        data-testid="CreateMission-Form__About_Wrapper"
        style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="label"
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
              onFocus={() => console.log(field.state.value)}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              sx={{
                maxWidth: '150px',
                mb: '.5em',
              }}
            />
          )}
        />
        <PopupFormSelection
          data-testid="CreateMission-Form__ObjectiveList_Wrapper"
          sx={{
            flexDirection: 'column',
            p: '.5em',
            gap: '.5em',
            maxHeight: '300px',
            overflow: 'auto',
            justifyContent: 'flex-start',
          }}
        >
          <form.Field
            name="objectives"
            data-testid="CreateMission-Form__Objective_Wrapper"
            mode="array"
          >
            {(field) => (
              <div>
                {field.state.value.map((objective, i) => {
                  return (
                    <DigiDisplay
                      data-testid="CreateMission-Form__Objective_Wrapper"
                      key={i}
                      sx={{
                        p: '.5em',
                        position: 'relative',
                      }}
                    >
                      <Tooltip
                        data-testid="CreateMission-Form-Objective__Remove_Tooltip"
                        title="Remove Objective"
                        arrow
                      >
                        <IconButton
                          data-testid="CreateMission-Form-Objective__RemoveButton"
                          color="error"
                          onClick={() => field.removeValue(i)}
                          sx={{
                            position: 'absolute',
                            top: '-.5em',
                            left: '-.5em',
                            zIndex: 2,
                          }}
                        >
                          <Close color="error" />
                        </IconButton>
                      </Tooltip>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '.5em',
                          width: '100%',
                          flexShrink: 0,
                        }}
                      >
                        <Button onClick={() => console.log(field)}>Print</Button>
                        <form.Field
                          name={`objectives[${i}].label`}
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
                        <form.Field
                          name={`objectives[${i}].pickup.location`}
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
                          name={`objectives[${i}].dropoff.location`}
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
                          name={`objectives[${i}].manifest`}
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
                      </div>
                    </DigiDisplay>
                  );
                })}
              </div>
            )}
          </form.Field>
        </PopupFormSelection>
      </form>
    </VLPopup>
  );
};
