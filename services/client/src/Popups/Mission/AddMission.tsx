import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { PopupFormSelection } from '@Common/Components/Boxes/PopupFormSelection';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { destinationsFromObjectives } from '@Components/Locations/Routes/RouteUtilities';
import { Add, AddCircleOutline, Close } from '@mui/icons-material';
import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { POPUP_ADD_LOCATION } from '@Popups/AddLocation/AddLocation';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import {
  addDestinations,
  updateDestinations,
} from '@Redux/Slices/Routes/actions/destination.action';
import { createMission } from '@Redux/Slices/Routes/actions/mission.action';
import { selectDestinations } from '@Redux/Slices/Routes/routes.selectors';
import { numericalFilter } from '@Utils/numericFilter';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IMission, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

export const POPUP_CREATE_MISSION = 'create_mission';

type Objective = {
  packageId: number | null;
  pickup: ILocation | null;
  dropOff: ILocation | null;
  contents: string;
  scu: number | null;
};

export const AddMissionPopup: React.FC = () => {
  const [objectives, setObjectives] = React.useState<Objective[]>([
    { packageId: null, pickup: null, dropOff: null, contents: '', scu: null },
  ]);
  const [missionId, setMissionId] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const userLocation = useAppSelector(selectUserLocation);

  const handleOpenAddLocation = React.useCallback(
    (callback: (location: ILocation | null) => void) => {
      dispatch(openPopup(POPUP_ADD_LOCATION, { onLocationSelection: callback }));
    },
    [dispatch],
  );

  const handleObjectiveChange = React.useCallback(
    (index: number, field: keyof Objective, value: string | number | ILocation) => {
      if ((field === 'scu' || field === 'packageId') && typeof value === 'string') {
        const filteredValue = numericalFilter(value);
        setObjectives((prevObjectives) =>
          prevObjectives.map((obj, i) =>
            i === index ? { ...obj, [field]: filteredValue } : obj,
          ),
        );
        return;
      }
      setObjectives((prevObjectives) =>
        prevObjectives.map((obj, i) => (i === index ? { ...obj, [field]: value } : obj)),
      );
    },
    [setObjectives],
  );

  const handleAddObjective = React.useCallback(() => {
    setObjectives((prevObjectives) => [
      ...prevObjectives,
      { packageId: null, pickup: null, dropOff: null, contents: '', scu: null },
    ]);
  }, [setObjectives]);

  const handleRemoveObjective = React.useCallback(
    (index: number) => {
      setObjectives((prevObjectives) => prevObjectives.filter((_, i) => i !== index));
    },
    [setObjectives],
  );

  const handleLocationSelect = React.useCallback(
    (location: ILocation | null, index: number, locationType: 'pickup' | 'dropOff') => {
      if (location) {
        handleObjectiveChange(index, locationType, location);
      }
      dispatch(closePopup(POPUP_ADD_LOCATION));
    },
    [handleObjectiveChange, dispatch],
  );

  const objectivesToDestinations = React.useCallback(() => {
    return destinationsFromObjectives(
      objectives as IObjective[],
      destinations,
      userLocation,
    );
  }, [objectives, destinations, userLocation]);
  const handleSubmit = React.useCallback(() => {
    if (missionId != null && objectives.length > 0) {
      const mission: IMission = {
        missionId,
        objectives: objectives as IObjective[],
      };
      dispatch(createMission(mission));
      dispatch(addDestinations(objectivesToDestinations().newDestinations));
      dispatch(updateDestinations(objectivesToDestinations().updatedDestinations));
      dispatch(closePopup(POPUP_CREATE_MISSION));
    }
  }, [dispatch, objectives, missionId, objectivesToDestinations]);

  const validateForm = React.useCallback(() => {
    return (
      missionId != null &&
      objectives.every((obj) => {
        return obj.packageId != null && obj.pickup != null && obj.dropOff != null;
      })
    );
  }, [missionId, objectives]);

  const isValid = validateForm();
  return (
    <VLPopup
      data-testid="CreateMission_Form"
      name={POPUP_CREATE_MISSION}
      title="Create Mission"
      onCancel={() => dispatch(closePopup(POPUP_CREATE_MISSION))}
      onSubmit={handleSubmit}
      submitDisabled={!isValid}
      submitText="Create"
      sx={{
        minWidth: '800px',
      }}
    >
      <FormControl data-testid="CreateMission__FormControl" sx={{ p: '.5em' }}>
        <TextField
          data-testid="CreateMission-Form__MissionId_Field"
          label="Mission Id"
          size="medium"
          color="secondary"
          required
          value={missionId !== null ? missionId.toString() : ''}
          onChange={(e) => setMissionId(numericalFilter(e.currentTarget.value))}
          sx={{
            maxWidth: '150px',
            mb: '.5em',
          }}
          slotProps={{
            input: {
              inputProps: {
                maxLength: 8,
              },
              startAdornment: missionId == null ? null : <Typography>#</Typography>,
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
          {objectives.map((obj, index) => (
            <DigiDisplay
              data-testid="CreateMission-Form__Objective_Wrapper"
              key={index}
              sx={{
                flexDirection: 'row',
                p: '.5em',
                gap: '.5em',
                width: '100%',
                flexShrink: 0,
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
              <TextField
                data-testid="CreateMission-Form-Objective__PackageId_Field"
                label="PackageId"
                size="small"
                color="secondary"
                required
                value={obj.packageId !== null ? obj.packageId.toString() : ''}
                onChange={(e) =>
                  handleObjectiveChange(index, 'packageId', e.currentTarget.value)
                }
                slotProps={{
                  input: {
                    inputProps: {
                      maxLength: 8,
                    },
                    startAdornment:
                      obj.packageId == null ? null : <Typography>#</Typography>,
                  },
                }}
              />
              <TextField
                data-testid="CreateMission-Form-Objective__Pickup_Field"
                label="Pickup"
                size="small"
                color="secondary"
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <Tooltip title="Add Location">
                        <IconButton
                          onClick={() =>
                            handleOpenAddLocation((location) =>
                              handleLocationSelect(location, index, 'pickup'),
                            )
                          }
                        >
                          <Add />
                        </IconButton>
                      </Tooltip>
                    ),
                    startAdornment: obj.pickup ? (
                      <LocationChip locationId={obj.pickup.id} />
                    ) : null,
                    readOnly: true,
                    sx: {
                      cursor: 'default',
                    },
                  },
                  htmlInput: {
                    sx: {
                      cursor: 'default',
                    },
                  },
                }}
              />
              <TextField
                data-testid="CreateMission-Form-Objective__DropOff_Field"
                label="Drop-Off"
                size="small"
                color="secondary"
                required
                slotProps={{
                  input: {
                    endAdornment: (
                      <Tooltip title="Add Location">
                        <IconButton
                          onClick={() =>
                            handleOpenAddLocation((location) =>
                              handleLocationSelect(location, index, 'dropOff'),
                            )
                          }
                        >
                          <Add />
                        </IconButton>
                      </Tooltip>
                    ),
                    startAdornment: obj.dropOff ? (
                      <LocationChip locationId={obj.dropOff.id} />
                    ) : null,
                    readOnly: true,
                    sx: {
                      cursor: 'default',
                    },
                  },
                  htmlInput: {
                    sx: {
                      cursor: 'default',
                    },
                  },
                }}
              />
              <TextField
                data-testid="CreateMission-Form-Objective__Contents_Field"
                label="Contents"
                size="small"
                color="secondary"
                required
                value={obj.contents}
                onChange={(e) =>
                  handleObjectiveChange(index, 'contents', e.currentTarget.value)
                }
              />
              <TextField
                data-testid="CreateMission-Form-Objective__SCU_Field"
                label="SCU"
                size="small"
                color="secondary"
                required
                value={obj.scu !== null ? obj.scu.toLocaleString() : ''}
                onChange={(e) =>
                  handleObjectiveChange(index, 'scu', e.currentTarget.value)
                }
              />
            </DigiDisplay>
          ))}
        </PopupFormSelection>
        <Box data-testid="CreateMission-Form__AddObjective_Wrapper">
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
        </Box>
      </FormControl>
    </VLPopup>
  );
};
