import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_CREATE_MISSION } from '@Popups/Mission/AddMission';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import {
  selectDestinations,
  selectMissions,
} from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';
import { IMission } from 'vl-shared/src/schemas/RoutesSchema';

import { DestinationQue } from './DestinationQue/DestinationQue';
import { Mission } from './Mission';
import { RouteViewer } from './RouteViewer/RouteViewer';

export const RouteApp: React.FC<unknown> = () => {
  const dispatch = useAppDispatch();

  const missions = useAppSelector(selectMissions);

  const destinations = useAppSelector(selectDestinations);

  const handleAddMission = React.useCallback(() => {
    dispatch(openPopup(POPUP_CREATE_MISSION));
  }, [dispatch]);

  //Fetch All Locations
  return (
    <Box
      data-testid="RouteTool__AppContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <RouteViewer destinations={destinations} />
      <DestinationQue destinations={destinations} missions={missions} />
      <GlassBox
        data-testid="RouteTool__MissionViewer_Container"
        sx={{ p: '1em', gap: '1em', overflow: 'hidden', height: '100%' }}
      >
        <Box
          data-testid="RouteTool-MissionViewer__TitleWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1em',
          }}
        >
          <Typography data-testid="RouteTool-MissionViewer__Title" variant="h5">
            Mission Viewer
          </Typography>
          <Button
            data-testid="RouteTool-MissionViewer__AddMission_Button"
            variant="popupButton"
            onClick={handleAddMission}
          >
            Add Mission
          </Button>
        </Box>
        <GlassBox sx={{ height: '90%', overflow: 'auto', gap: '1em', p: '.5em' }}>
          {missions.map((mission: IMission) => (
            <Mission key={mission.missionId} mission={mission} />
          ))}
          {missions.length === 0 && (
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                width: '100%',
                color: 'grey',
                textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
                mt: '5em',
              }}
            >
              Add A Mission To Begin
            </Typography>
          )}
        </GlassBox>
      </GlassBox>
    </Box>
  );
};
