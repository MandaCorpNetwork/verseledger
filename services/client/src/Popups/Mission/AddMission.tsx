import { useSoundEffect } from '@Audio/AudioManager';
import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { SCUQuickSelect } from '@Common/Components/App/SCUQuickSelect';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { AddCircleOutline, Close } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { createMission } from '@Redux/Slices/Routes/actions/mission.action';
import { createLocalID } from '@Utils/createId';
import { bindPopover, usePopupState } from 'material-ui-popup-state/hooks';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import {
  ILogisticTransport,
  IMission,
  IObjective,
} from 'vl-shared/src/schemas/RoutesSchema';

export const POPUP_CREATE_MISSION = 'create_mission';

export const AddMissionPopup: React.FC = () => {
  const [missionLabel, setMissionLabel] = React.useState<string | null>(null);
  const [objectives, setObjectives] = React.useState<ILogisticTransport[]>([
    {
      id: createLocalID('E'),
      label: '',
      pickup: {} as IObjective,
      dropoff: {} as IObjective,
      manifest: 'Unknown',
      scu: 0,
      status: 'PENDING',
    },
  ]);

  const dispatch = useAppDispatch();
  const sound = useSoundEffect();

  // Handle Editing Values of Objective
  const handleObjectiveData = React.useCallback(
    (index: number, field: keyof ILogisticTransport, value: string | number) => {
      if (
        field === 'id' ||
        field === 'pickup' ||
        field === 'dropoff' ||
        field === 'status'
      ) {
        return;
      }
      setObjectives((prev) =>
        prev.map((obj, idx) => (idx === index ? { ...obj, [field]: value } : obj)),
      );
    },
    [setObjectives],
  );

  const handleObjectiveLocations = React.useCallback(
    (index: number, field: keyof ILogisticTransport, value: ILocation | null) => {
      if (field !== 'pickup' && field !== 'dropoff') return;
      if (!value) {
        setObjectives((prev) =>
          prev.map((obj, idx) =>
            idx === index ? { ...obj, [field]: {} as IObjective } : obj,
          ),
        );
        return;
      }
      const newObjective: IObjective = {
        id: createLocalID('E'),
        type: field,
        location: value,
        status: 'PENDING',
      };
      setObjectives((prev) =>
        prev.map((obj, idx) => (idx === index ? { ...obj, [field]: newObjective } : obj)),
      );
    },
    [setObjectives],
  );

  const handleAddObjective = React.useCallback(() => {
    const newObjective: ILogisticTransport = {
      id: createLocalID('E'),
      label: '',
      pickup: {} as IObjective,
      dropoff: {} as IObjective,
      manifest: 'Unknown',
      scu: 0,
      status: 'PENDING',
    };
    sound.playSound('clickMain');
    setObjectives((prev) => [...prev, newObjective]);
  }, [setObjectives, sound]);

  const handleRemoveObjective = React.useCallback(
    (index: number) => {
      setObjectives((prev) => {
        if (prev.length <= 1) {
          sound.playSound('denied');
          return prev;
        }
        sound.playSound('warning');
        return prev.filter((_, idx) => idx !== index);
      });
    },
    [setObjectives, sound],
  );

  // SCU Value Quick Select
  const scuQuickPopupState = usePopupState({
    variant: 'popover',
    popupId: 'scuQuickPopup',
  });

  const handleSCUQuick = React.useCallback(
    (index: number) => (value: number) => {
      sound.playSound('clickMain');
      setObjectives((prev) =>
        prev.map((obj, idx) => (idx === index ? { ...obj, scu: value } : obj)),
      );
      scuQuickPopupState.close();
    },
    [scuQuickPopupState, sound],
  );

  //TODO: Fix Render Continuity Issues
  const renderSCUQuickSelect = (index: number, scu: number) => (
    <Popover
      {...bindPopover(scuQuickPopupState)}
      sx={{ p: '1em' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'transparent',
            p: '0.5em',
            backdropFilterfilter: 'blur(20px)',
            backgroundImage:
              'linear-gradient(165deg, rgba(8,22,80,0.5), rgba(0,1,19,0.2))',
          },
        },
      }}
    >
      <SCUQuickSelect onClick={handleSCUQuick(index)} value={scu} />
    </Popover>
  );

  // const objectivesToDestinations = React.useCallback(() => {
  //   return destinationsFromObjectives(
  //     objectives as IObjective[],
  //     destinations,
  //     userLocation,
  //   );
  // }, [objectives, destinations, userLocation]);
  // const handleSubmit = React.useCallback(() => {
  //   if (missionId != null && objectives.length > 0) {
  //     const mission: IMission = {
  //       missionId,
  //       objectives: objectives as IObjective[],
  //     };
  //     dispatch(createMission(mission));
  //     dispatch(addDestinations(objectivesToDestinations().newDestinations));
  //     dispatch(updateDestinations(objectivesToDestinations().updatedDestinations));
  //     dispatch(closePopup(POPUP_CREATE_MISSION));
  //   }
  // }, [dispatch, objectives, missionId, objectivesToDestinations]);

  const validateForm = React.useCallback(() => {
    return (
      missionLabel != null &&
      objectives.length > 0 &&
      objectives.every((obj) => {
        return obj.label != null && obj.pickup.id != '' && obj.dropoff.id != '';
      })
    );
  }, [missionLabel, objectives]);

  const isValid = validateForm();

  const handleClose = React.useCallback(() => {
    dispatch(closePopup(POPUP_CREATE_MISSION));
    sound.playSound('close');
  }, [dispatch, sound]);

  const handleSubmit = React.useCallback(() => {
    if (isValid) {
      const mission: IMission = {
        id: createLocalID('E'),
        label: missionLabel!,
        objectives: objectives,
      };
      dispatch(createMission(mission));
    }
  }, [dispatch, isValid, missionLabel, objectives]);

  return (
    <VLPopup
      data-testid="CreateMission_Form"
      name={POPUP_CREATE_MISSION}
      title="Create Mission"
      onCancel={handleClose}
      onSubmit={handleSubmit}
      submitDisabled={!isValid}
      submitText="Create"
      sx={{
        minWidth: '800px',
      }}
    >
      <div data-testid="CreateMission-Form__About_Wrapper">
        <Typography>Create a mission for Routes.</Typography>
      </div>
      <div>
        <FormControl data-testid="CreateMission__FormControl" sx={{ p: '.5em' }}>
          <TextField
            data-testid="CreateMission-Form__MissionId_Field"
            label="Mission Label"
            size="medium"
            color="secondary"
            required
            value={missionLabel ?? ''}
            onChange={(e) => setMissionLabel(e.currentTarget.value)}
            sx={{
              maxWidth: '150px',
              mb: '.5em',
            }}
            slotProps={{
              input: {
                inputProps: {
                  maxLength: 32,
                },
              },
            }}
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
            {objectives.map((objective, index) => (
              <DigiDisplay
                data-testid="CreateMission-Form__Objective_Wrapper"
                key={objective.id}
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
                    onClick={() => handleRemoveObjective(index)}
                    color="error"
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
                  <TextField
                    data-testid="CreateMission-Form-Objective__PackageLabel_Field"
                    label="Label"
                    size="small"
                    color="secondary"
                    required
                    value={objective.label ?? ''}
                    // onChange={(e) =>
                    //   handleObjectiveChange(index, 'packageId', e.currentTarget.value)
                    // }
                    slotProps={{
                      input: {
                        inputProps: {
                          maxLength: 8,
                        },
                      },
                    }}
                    sx={{
                      maxWidth: '130px',
                    }}
                  />
                  <LocationSearch
                    onLocationSelect={() => {}}
                    label="Pickup Location"
                    required
                    sx={{ minWidth: '175px' }}
                  />
                  <LocationSearch
                    onLocationSelect={() => {}}
                    label="DropOff Location"
                    required
                    sx={{ minWidth: '175px' }}
                  />
                  <TextField
                    data-testid="CreateMission-Form-Objective__Contents_Field"
                    label="Contents"
                    size="small"
                    color="secondary"
                    required
                    value={objective.manifest}
                    // onChange={(e) =>
                    //   handleObjectiveChange(index, 'contents', e.currentTarget.value)
                    //}
                  />
                  <TextField
                    data-testid="CreateMission-Form-Objective__SCU_Field"
                    label="SCU"
                    size="small"
                    color="secondary"
                    required
                    value={objective.scu != 0 ? objective.scu.toLocaleString() : ''}
                    onFocus={scuQuickPopupState.open}
                    onBlur={scuQuickPopupState.close}
                    // onChange={(e) =>
                    //   handleObjectiveChange(index, 'scu', e.currentTarget.value)
                    // }
                  />
                  {renderSCUQuickSelect(index, objective.scu)}
                </div>
              </DigiDisplay>
            ))}
          </PopupFormSelection>
          <div data-testid="CreateMission-Form__AddObjective_Wrapper">
            <Tooltip
              data-testid="CreateMission-Form__AddObjective_Tooltip"
              title="Add Objective"
              arrow
            >
              <IconButton
                data-testid="CreateMission-Form__AddObjective_Button"
                onClick={handleAddObjective}
              >
                <AddCircleOutline fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        </FormControl>
      </div>
    </VLPopup>
  );
};
