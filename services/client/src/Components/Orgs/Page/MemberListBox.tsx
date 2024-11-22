import { useSoundEffect } from '@Audio/AudioManager';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { List } from '@mui/icons-material';
import { ToggleButton, Typography } from '@mui/material';
import React from 'react';

export const MemberListBox: React.FC = () => {
  const [listView, setListView] = React.useState<boolean>(false);
  const sound = useSoundEffect();

  const handleListToggle = React.useCallback(() => {
    setListView((prev) => {
      sound.playSound('clickMain');
      return !prev;
    });
  }, [setListView, sound]);
  return (
    <GlassDisplay
      data-testid="OrgPage__MemberList_Wrapper"
      sx={{ minWidth: { xs: '320px', md: '400', lg: '600' }, p: '0.5em' }}
    >
      <div
        data-testid="OrgPage-MemberList__Header_Wrapper"
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          data-testid="OrgPage-MemberList__Header"
          variant="h5"
          sx={{ mx: 'auto', cursor: 'default' }}
        >
          Member List
        </Typography>
        <ToggleButton
          data-testid="OrgPage-MemberList__List_ToggleButton"
          value="list"
          size="small"
          color="secondary"
          sx={{ p: '0.2em' }}
          onClick={handleListToggle}
          selected={listView}
        >
          <List fontSize="medium" />
        </ToggleButton>
      </div>
      <div
        data-testid="OrgPage-MemberList__List_Wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1em',
          }}
        >
          <Typography variant="h6">Structure Display</Typography>
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Ranks</Typography>
            <Typography variant="subtitle2">Admiral</Typography>
            <Typography variant="subtitle2">Captain</Typography>
            <Typography variant="subtitle2">Lieutenant</Typography>
            <Typography variant="subtitle2">Corporal</Typography>
          </div>
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Roles</Typography>
            <Typography variant="subtitle2">Owner</Typography>
            <Typography variant="subtitle2">Officer</Typography>
            <Typography variant="subtitle2">Recruiter</Typography>
            <Typography variant="subtitle2">Trainer</Typography>
          </div>
        </div>
      </div>
    </GlassDisplay>
  );
};
