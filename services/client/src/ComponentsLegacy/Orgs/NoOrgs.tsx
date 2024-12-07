import { GlassDisplay } from '@CommonLegacy/Components/Boxes/GlassDisplay';
import { GroupAddTwoTone } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { POPUP_ADD_ORG } from '@Popups/Orgs/AddOrg/AddOrg';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

export const NoOrgs: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(openPopup(POPUP_ADD_ORG));
  }, [dispatch]);
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GlassDisplay sx={{ p: '1em' }}>
        <Typography
          variant="h4"
          color="textDisabled"
          sx={{ fontWeight: 'bold', textShadow: '0 2px 2px rgba(0,0,0)', mb: '0.5em' }}
        >
          You Aren&apos;t In An Organization
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          startIcon={<GroupAddTwoTone />}
          onClick={handleClick}
          sx={{
            fontWeight: 'bold',
          }}
        >
          Add Organization
        </Button>
      </GlassDisplay>
    </div>
  );
};
