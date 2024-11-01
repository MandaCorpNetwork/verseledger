import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import React from 'react';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

type MissionProps = {
  tasks: ITask[];
};

export const Mission: React.FC<MissionProps> = ({ tasks }) => {
  const dispatch = useAppDispatch();
  // const handleAbandonMission = React.useCallback(
  //   (mission: IMission) => {
  //     dispatch(abandonMission(mission));
  //   },
  //   [dispatch],
  // );

  const pickupStyle = React.useCallback((objective: ITask) => {
    switch (objective.status) {
      case 'INTERUPTED':
        return { color: 'error.light', borderColor: 'error.main' };
      case 'COMPLETED':
        return { color: 'success.light', borderColor: 'success.main' };
      case 'ENROUTE':
        return { color: 'text.secondary', borderColor: 'text.secondary' };
      case 'PENDING':
      default:
        return { color: 'secondary.main', borderColor: 'secondary.main' };
    }
  }, []);

  const dropoffStyle = React.useCallback((objective: ITask) => {
    switch (objective.status) {
      case 'INTERUPTED':
        return { color: 'error.light', borderColor: 'error.main' };
      case 'COMPLETED':
        return { color: 'success.light', borderColor: 'success.main' };
      case 'PENDING':
      default:
        return { color: 'secondary.main', borderColor: 'secondary.main' };
    }
  }, []);

  //   { color: 'secondary.main' },
  //   obj.dropoff.status === 'COMPLETED' && { color: 'success.light' },
  //   obj.dropoff.status === 'INTERUPTED' && { color: 'error.light' },
  // ];

  // obj.pickup.status === 'ENROUTE' || obj.pickup.status === 'COMPLETED'
  //   ? 'success'
  //   : obj.pickup.status === 'INTERUPTED'
  //     ? 'error'
  //     : 'secondary';

  const relationalIds = tasks.map((task) => task.relationId).filter(Boolean);
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
          return (
            <DigiDisplay
              key={id}
              data-testid="RouteTool-MissionViewer-Mission__Objective_Item"
              sx={[
                {
                  flexDirection: 'row',
                  gap: '.5em',
                  py: '.5em',
                  px: '1em',
                  position: 'relative',
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
              <DigiField label="Task Label"></DigiField>
            </DigiDisplay>
          );
        })}
        {/* {mission.objectives.map((obj) => (
          <DigiDisplay
            key={obj.id}
            
          >
            <DigiField label="Package Label"># {obj.label}</DigiField>
            <DigiField label="Pickup Location">
              <LocationChip
                locationId={obj.pickup.location.id}
                sx={pickupStyle(obj.pickup)}
              />
            </DigiField>
            <DigiField label="Drop-off Location">
              <LocationChip
                locationId={obj.dropoff.location.id}
                sx={dropoffStyle(obj.dropoff)}
              />
            </DigiField>
          </DigiDisplay>
        ))} */}
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
          color="error"
          // onClick={() => handleAbandonMission(mission)}
          disabled
        >
          Abandon Mission
        </Button>
      </Box>
    </DigiBox>
  );
};
