import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Button, Typography } from '@mui/material';
import { POPUP_CREATE_MISSION } from '@Popups/Mission/AddMission';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { IMission } from 'vl-shared/src/schemas/RoutesSchema';

import { Mission } from './Mission';

type MissionViewerProps = {
  missions: IMission[];
};

export const MissionViewer: React.FC<MissionViewerProps> = ({ missions }) => {
  const dispatch = useAppDispatch();
  const handleAddMission = React.useCallback(() => {
    dispatch(openPopup(POPUP_CREATE_MISSION));
  }, [dispatch]);
  return (
    <GlassBox
      data-testid="RouteTool__MissionViewer_Container"
      sx={{ p: '1em', gap: '1em', overflow: 'hidden', height: '100%' }}
    >
      <div
        data-testid="RouteTool-MissionViewer__TitleWrapper"
        style={{
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
      </div>
      <GlassDisplay
        sx={{
          height: '90%',
          overflow: 'auto',
          gap: '1em',
          p: '.5em',
          minWidth: '400px',
        }}
      >
        {missions.map((mission: IMission) => (
          <Mission key={mission.id} mission={mission} />
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
      </GlassDisplay>
    </GlassBox>
  );
};
