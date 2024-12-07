import { useSoundEffect } from '@Audio/AudioManager';
import { AppButtonV2 } from '@CommonLegacy/Components/Buttons/AppButtonV2';
import { useMasterAppList } from '@CommonLegacy/DefinitionsLegacy/AppListings';
import { Close } from '@mui/icons-material';
import { Box, Grid2, IconButton, Tooltip, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

import { POPUP_APP_LIST } from './AllAppsModal';

export const AllAppsDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();

  const masterAppList = useMasterAppList();

  const handleClose = React.useCallback(() => {
    dispatch(closePopup(POPUP_APP_LIST));
  }, [dispatch]);

  const appCount = masterAppList.length;
  const columns = Math.min(4, Math.ceil(Math.sqrt(appCount)));
  return (
    <Box
      data-testid="AllApps-Modal__AllAppsDisplay_Wrapper"
      sx={{
        p: { xs: '1em', md: '2em', lg: '2.5%' },
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        data-testid="AllAppsDisplay__Title_Wrapper"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '1.5em',
          position: 'relative',
        }}
      >
        <Typography
          data-testid="AllAppsDisplay__Title"
          variant="h4"
          sx={{
            display: 'flex',
            mx: 'auto',
            color: 'text.secondary',
            textShadow:
              '0px 0px 3px rgba(0,1,19,.8), 2px 2px 6px rgba(0,1,19,.5), 3px 3px 10px rgba(0,1,19,.3)',
            letterSpacing: '1px',
            filter: 'drop-shadow(2px 2px 4px rgba(0, 1, 19, 0.5))',
          }}
        >
          App List
        </Typography>
        <Tooltip title="Close" arrow>
          <IconButton
            data-testid="AppList__Close_Button"
            size="medium"
            onClick={() => {
              handleClose();
              sound.playSound('close');
            }}
            sx={{
              position: 'absolute',
              right: 0,
              mr: { xs: '1em', md: '5%', lg: '20%' },
            }}
          >
            <Close
              data-testid="AppList__Close_Icon"
              fontSize="large"
              color="info"
              sx={{
                filter: 'drop-shadow(1px 2px 8px rgba(255,193,0,0.7))',
                transition: 'filter 0.2s ease-in-out',
                '&:hover': {
                  filter: 'drop-shadow(3px 2px 15px rgba(255,193,0))',
                },
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
      <Grid2
        container
        columnGap={{ xs: 2, md: 4 }}
        rowGap={{ xs: 2, md: 4 }}
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          justifyItems: 'center',
          maxWidth: 'fit-content',
          maxHeight: '100%',
          margin: '0 auto',
          overflowY: 'auto',
          p: '0.5em 1.5em',
          '&::-webkit-scrollbar': {
            width: '3px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(14,35,141,0.65)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgba(33,150,243,0.6)',
          },
        }}
      >
        {masterAppList
          .sort((a, b) => {
            if (a.disabled === b.disabled) return 0;
            return a.disabled ? 1 : -1;
          })
          .map((app) => (
            <Grid2
              key={app.id}
              size={{ xs: 4, md: 1 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AppButtonV2
                label={app.label}
                path={app.path}
                icon={app.icon}
                disabled={app.disabled ?? false}
              />
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};
