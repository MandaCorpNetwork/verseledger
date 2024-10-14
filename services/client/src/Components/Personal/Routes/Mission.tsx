import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { abandonMission } from '@Redux/Slices/Routes/actions/missionActions';
import React from 'react';
import { IMission } from 'vl-shared/src/schemas/RoutesSchema';

type MissionProps = {
  mission: IMission;
};

export const Mission: React.FC<MissionProps> = ({ mission }) => {
  const dispatch = useAppDispatch();
  const handleAbandonMission = React.useCallback(
    (mission: IMission) => {
      dispatch(abandonMission(mission));
    },
    [dispatch],
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
        Mission: #
        <Typography
          data-testid="RouteTool-MissionViewer-Mission__MissionId"
          variant="overline"
          sx={{ pl: '.5em' }}
        >
          {mission.missionId}
        </Typography>
      </Typography>
      <Box
        data-testid="RouteTool-MissionViewer-Mission__ObjectiveList_Wrapper"
        sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}
      >
        {mission.objectives.map((obj) => (
          <DigiDisplay
            key={obj.packageId}
            data-testid="RouteTool-MissionViewer-Mission__Objective_Item"
            sx={{ flexDirection: 'row', gap: '.5em', py: '.5em', px: '1em' }}
          >
            <DigiField label="Package ID"># {obj.packageId}</DigiField>
            <DigiField label="Pickup Location">
              <LocationChip
                locationId={obj.pickup.id}
                color={
                  obj.status === 'OBTAINED' || obj.status === 'COMPLETED'
                    ? 'success'
                    : obj.status === 'INTERUPTED'
                      ? 'error'
                      : 'secondary'
                }
              />
            </DigiField>
            <DigiField label="Drop-off Location">
              <LocationChip
                locationId={obj.dropOff.id}
                color={
                  obj.status === 'COMPLETED'
                    ? 'success'
                    : obj.status === 'INTERUPTED'
                      ? 'error'
                      : 'secondary'
                }
              />
            </DigiField>
            <DigiField label="Contents">{obj.contents}</DigiField>
            <DigiField label="SCU">{obj.scu?.toLocaleString()}</DigiField>
          </DigiDisplay>
        ))}
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
          onClick={() => handleAbandonMission(mission)}
        >
          Abandon Mission
        </Button>
      </Box>
    </DigiBox>
  );
};
