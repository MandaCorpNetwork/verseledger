import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { DigiField } from '@Common/Components/Custom/DigiField/DigiField';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export const Mission: React.FC = () => {
  return (
    <DigiBox
      data-testid="RouteTool-MissionViewer__Mission_Container"
      sx={{ alignItems: 'center', p: '.5em' }}
    >
      <Typography data-testid="RouteTool-MissionViewer-Mission__Title" variant="h6">
        Mission: #
      </Typography>
      <Box
        data-testid="RouteTool-MissionViewer-Mission__ObjectiveList_Wrapper"
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <DigiDisplay
          data-testid="RouteTool-MissionViewer-Mission__Objective_Item"
          sx={{ flexDirection: 'row', gap: '.5em', py: '.5em', px: '1em' }}
        >
          <DigiField label="Package ID"></DigiField>
          <DigiField label="Pickup Location"></DigiField>
          <DigiField label="Drop-off Location"></DigiField>
          <DigiField label="Contents"></DigiField>
          <DigiField label="SCU"></DigiField>
        </DigiDisplay>
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
        >
          Edit Mission
        </Button>
        <Button
          data-testid="RouteTool-MissionViewer-Mission__AbandonMission_Button"
          variant="contained"
          size="small"
          color="error"
        >
          Abandon Mission
        </Button>
      </Box>
    </DigiBox>
  );
};
