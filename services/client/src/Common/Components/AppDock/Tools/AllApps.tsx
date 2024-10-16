import { useSoundEffect } from '@Audio/AudioManager';
import { masterAppList } from '@Common/Definitions/Apps';
import { Close } from '@mui/icons-material';
import { Box, Fade, Grid2, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { selectIsPopupOpen } from '@Redux/Slices/Popups/popups.selectors';
import React from 'react';

import { AppIcon } from '../Icons/AppIcon';

export const POPUP_APP_LIST = 'appList';

const AllAppsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { playSound } = useSoundEffect();
  const handleClose = React.useCallback(() => {
    dispatch(closePopup(POPUP_APP_LIST));
  }, [dispatch]);
  const isOpen = useAppSelector((state) => selectIsPopupOpen(state, POPUP_APP_LIST));
  return (
    <Modal
      data-testid="AppList__Modal"
      open={true}
      data-popupState={0}
      sx={{
        backdropFilter: 'blur(12px)',
        backgroundImage:
          'linear-gradient(135deg, rgba(14,35,141,0.4) 40%, rgba(8,22,80,0.6))',
      }}
    >
      <Fade in={isOpen} timeout={800}>
        <Box
          data-testid="AppList__Wrapper"
          sx={{ p: { xs: '1em', md: '5%', lg: '10%' } }}
        >
          <Box
            data-testid="AppList__Title_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              mb: { xs: '1em', md: '2em', lg: '3em' },
            }}
          >
            <Typography
              data-testid="AppList__Title"
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
                  playSound('close');
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
          </Box>
          <Grid2 container spacing={2} data-testid="AppList__ListContainer">
            {masterAppList.map((app) => (
              <Grid2
                key={app.id}
                container
                data-testid={`AppList-List__${app.id}_Wrapper`}
              >
                <AppIcon
                  label={app.label}
                  path={app.path}
                  icon={app.icon as JSX.Element}
                  disabled={app.disabled ?? false}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Fade>
    </Modal>
  );
};

export const AllApps = React.memo(AllAppsComponent);

//Modal BoxShadow
// boxShadow:
//   'inset 0 4px 10px rgba(255, 255, 255, 0.1), inset 0 -6px 15px rgba(0, 0, 0, 0.4), inset 10px 10px 20px rgba(0, 0, 0, 0.25), inset -10px -10px 20px rgba(255, 255, 255, 0.2)',
