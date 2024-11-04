import { useSoundEffect } from '@Audio/AudioManager';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { Scu3d } from '@Common/Definitions/CustomIcons';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { replaceDestinations } from '@Redux/Slices/Routes/actions/destination.action';
import { replaceTasks } from '@Redux/Slices/Routes/actions/task.action';
import { selectDestinations, selectTasks } from '@Redux/Slices/Routes/routes.selectors';
import { enqueueSnackbar } from 'notistack';
// import { useAppDispatch } from '@Redux/hooks';
import React from 'react';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

type MissionProps = {
  tasks: ITask[];
};

export const Mission: React.FC<MissionProps> = ({ tasks }) => {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const taskArray = useAppSelector(selectTasks);
  const sound = useSoundEffect();

  const handleAbandonMission = React.useCallback(() => {
    const updatedTasks = taskArray.filter((task) => !tasks.some((t) => t.id === task.id));

    const updatedDestinations = destinations
      .map((dest) => ({
        ...dest,
        tasks: dest.tasks.filter((task) => !tasks.some((t) => t.id === task.id)),
      }))
      .filter((dest) => dest.tasks.length > 0);

    dispatch(replaceDestinations(updatedDestinations));
    dispatch(replaceTasks(updatedTasks));
    enqueueSnackbar('Removed Mission', { variant: 'warning' });
    sound.playSound('loading');
  }, [taskArray, destinations, tasks, dispatch, sound]);
  // const handleAbandonMission = React.useCallback(
  //   (mission: IMission) => {
  //     dispatch(abandonMission(mission));
  //   },
  //   [dispatch],
  // );

  // const pickupStyle = React.useCallback((objective: ITask) => {
  //   switch (objective.status) {
  //     case 'INTERUPTED':
  //       return { color: 'error.light', borderColor: 'error.main' };
  //     case 'COMPLETED':
  //       return { color: 'success.light', borderColor: 'success.main' };
  //     case 'ENROUTE':
  //       return { color: 'text.secondary', borderColor: 'text.secondary' };
  //     case 'PENDING':
  //     default:
  //       return { color: 'secondary.main', borderColor: 'secondary.main' };
  //   }
  // }, []);

  // const dropoffStyle = React.useCallback((objective: ITask) => {
  //   switch (objective.status) {
  //     case 'INTERUPTED':
  //       return { color: 'error.light', borderColor: 'error.main' };
  //     case 'COMPLETED':
  //       return { color: 'success.light', borderColor: 'success.main' };
  //     case 'PENDING':
  //     default:
  //       return { color: 'secondary.main', borderColor: 'secondary.main' };
  //   }
  // }, []);

  //   { color: 'secondary.main' },
  //   obj.dropoff.status === 'COMPLETED' && { color: 'success.light' },
  //   obj.dropoff.status === 'INTERUPTED' && { color: 'error.light' },
  // ];

  // obj.pickup.status === 'ENROUTE' || obj.pickup.status === 'COMPLETED'
  //   ? 'success'
  //   : obj.pickup.status === 'INTERUPTED'
  //     ? 'error'
  //     : 'secondary';

  const relationalIds = Array.from(
    new Set(tasks.map((task) => task.relationId).filter(Boolean)),
  );
  return (
    <DigiBox
      data-testid="RouteTool-MissionViewer__Mission_Container"
      sx={{ alignItems: 'center', p: '.5em' }}
    >
      <Typography
        data-testid="RouteTool-MissionViewer-Mission__Title"
        variant="h6"
        sx={{ display: 'inline-flex', alignItems: 'center' }}
      >
        Mission:
        <Typography
          data-testid="RouteTool-MissionViewer-Mission__MissionId"
          variant="overline"
          sx={{ pl: '.5em' }}
        >
          {tasks[0].missionLabel}
        </Typography>
      </Typography>
      <Box
        data-testid="RouteTool-MissionViewer-Mission__ObjectiveList_Wrapper"
        sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}
      >
        {relationalIds.map((id) => {
          const pickup = tasks.find(
            (task) => task.relationId === id && task.type === 'pickup',
          );
          const dropoffs = tasks.filter(
            (task) => task.relationId === id && task.type === 'dropoff',
          );
          return (
            <DigiDisplay
              key={id}
              data-testid="RouteTool-MissionViewer-Mission__Objective_Item"
              sx={[
                {
                  flexDirection: 'column',
                  gap: '.5em',
                  py: '.5em',
                  px: '1em',
                  position: 'relative',
                  width: '100%',
                },
                // obj.status === 'COMPLETED' && {
                //   opacity: 0.5,
                //   transition: 'opacity 0.3s ease',
                //   '&:hover': {
                //     opacity: 1,
                //   },
                // },
              ]}
            >
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
                <DigiField label="Task Label">{pickup?.label}</DigiField>
                <DigiField
                  label="Total SCU"
                  endAdornment={<Scu3d />}
                >{`${pickup?.scu}`}</DigiField>
                <DigiField label="Item">{pickup?.item}</DigiField>
              </div>
              <Typography>Pickup Location</Typography>
              <LocationChip locationId={pickup?.location.id ?? ''} />
              <Typography>Dropoff Locations</Typography>
              <div style={{ gap: '1em' }}>
                {dropoffs.map((drop) => (
                  <div
                    key={drop.id}
                    style={{
                      display: 'flex',
                      gap: '1em',
                      border: '2px solid',
                      padding: '0.4em 1em',
                      borderRadius: '10px',
                      margin: '0.5em',
                    }}
                  >
                    <DigiField label="Dropoff Location">
                      <LocationChip locationId={drop.location.id} />
                    </DigiField>
                    <DigiField
                      label="SCU"
                      endAdornment={<Scu3d />}
                    >{`${drop?.scu}`}</DigiField>
                  </div>
                ))}
              </div>
            </DigiDisplay>
          );
        })}
      </Box>
      <Box
        data-testid="RouteTool-MissionViewer-Mission__Controller_Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          px: '1em',
          mt: '.5em',
        }}
      >
        <Button
          data-testid="RouteTool-MissionViewer-Mission__EditMission_Button"
          variant="contained"
          size="small"
          color="info"
          disabled
        >
          Edit Mission
        </Button>
        <Button
          data-testid="RouteTool-MissionViewer-Mission__AbandonMission_Button"
          variant="contained"
          size="small"
          color="warning"
          onClick={handleAbandonMission}
        >
          Abandon Mission
        </Button>
      </Box>
    </DigiBox>
  );
};
