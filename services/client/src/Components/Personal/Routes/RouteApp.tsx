import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_CREATE_MISSION } from '@Popups/Mission/AddMission';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { isDev } from '@Utils/isDev';
import React from 'react';

import { CurrentDestination } from './CurrentDestination';
import { DestinationQue } from './DestinationQue';
import { Mission } from './Mission';
import { NextDestination } from './NextDestination';

export const RouteApp: React.FC<unknown> = () => {
  const dev = isDev();
  const dispatch = useAppDispatch();

  const handleAddMission = React.useCallback(() => {
    dispatch(openPopup(POPUP_CREATE_MISSION));
  }, [dispatch]);
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
      {!dev && <InDevOverlay />}
      <GlassBox
        data-testid="RouteTool__RouteViewer_Container"
        sx={{ p: '1em', gap: '1em' }}
      >
        <Box
          data-testid="RouteTool-RouteViewer__Title_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1em',
          }}
        >
          <Typography data-testid="RouteTool-RouteViewer__Title" variant="h5">
            Route Viewer
          </Typography>
          <Button
            data-testid="RouteTool-RouteViewer__OpenWidget__Button"
            variant="popupButton"
          >
            Open Widget
          </Button>
          <Button
            data-testid="RouteTool-RouteViewer__AddStop__Button"
            variant="popupButton"
          >
            Add Stop
          </Button>
        </Box>
        <CurrentDestination />
        <NextDestination />
        <DestinationQue />
      </GlassBox>
      <GlassBox
        data-testid="RouteTool__MissionViewer_Container"
        sx={{ p: '1em', gap: '1em' }}
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
        <Mission />
      </GlassBox>
    </Box>
  );
};

const sampleMissions = [
  {
    missionId: '445345',
    objectives: [
      {
        packageId: '556423',
        pickupLocation: 'Everus Harbor',
        dropoffLocation: 'Lorville',
        contents: 'Unknown',
        scu: '1',
      },
      {
        packageId: '777685',
        pickupLocation: 'HDMS-Razor',
        dropoffLocation: 'Klecher',
        contents: 'Unknown',
        scu: '1',
      },
      {
        packageId: '888542',
        pickupLocation: 'HDSF-Callifer',
        dropoffLocation: 'New Babbage',
        contents: 'Unknown',
        scu: '1',
      },
    ],
  },
  {
    missionId: '885463',
    objectives: [
      {
        packageId: '885745',
        pickupLocation: 'Everus Harbor',
        dropoffLocation: 'Lorville',
        contents: 'Copper',
        scu: '10',
      },
      {
        packageId: '356998',
        pickupLocation: 'HDMS-Razor',
        dropoffLocation: 'Klecher',
        contents: 'Medical Supplies',
        scu: '20',
      },
      {
        packageId: '448756',
        pickupLocation: 'HDSF-Callifer',
        dropoffLocation: 'New Babbage',
        contents: 'Tungsten',
        scu: '15',
      },
    ],
  },
  {
    missionId: '886547',
    objectives: [
      {
        packageId: '223542',
        pickupLocation: 'Everus Harbor',
        dropoffLocation: 'Lorville',
        contents: 'Unknown',
        scu: '1',
      },
      {
        packageId: '339654',
        pickupLocation: 'HDMS-Razor',
        dropoffLocation: 'Klecher',
        contents: 'Unknown',
        scu: '1',
      },
      {
        packageId: '778545',
        pickupLocation: 'HDSF-Callifer',
        dropoffLocation: 'New Babbage',
        contents: 'Unknown',
        scu: '1',
      },
    ],
  },
];
