import { useSoundEffect } from '@Audio/AudioManager';
import { masterAppList } from '@Common/Definitions/AppListings';
import { Close } from '@mui/icons-material';
import { Box, Grid2, Grow, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { selectIsPopupOpen } from '@Redux/Slices/Popups/popups.selectors';
import React from 'react';

import { AllAppButton } from '../Icons/AllAppButton';

export const POPUP_APP_LIST = 'appList';

export const AllApps: React.FC = () => {
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const handleClose = React.useCallback(() => {
    dispatch(closePopup(POPUP_APP_LIST));
  }, [dispatch]);
  const isOpen = useAppSelector((state) => selectIsPopupOpen(state, POPUP_APP_LIST));

  const appCount = masterAppList.length;

  const columns = Math.min(4, Math.ceil(Math.sqrt(appCount)));
  return (
    <Modal
      data-testid="AppList__Modal"
      open={true}
      data-popupState={0}
      sx={{
        backdropFilter: 'blur(12px)',
        background: 'linear-gradient(135deg, rgba(14,35,141,0.4) 40%, rgba(8,22,80,0.6))',
      }}
    >
      <Grow in={isOpen} timeout={1000}>
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
              position: 'relative',
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
          </Box>
          <Grid2
            container
            columnGap={{ xs: 2, md: 4, lg: 6 }}
            rowGap={{ xs: 2, md: 4, lg: 6 }}
            data-testid="AppList__ListContainer"
            columns={columns}
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              justifyItems: 'center',
              maxWidth: 'fit-content',
              margin: '0 auto',
            }}
          >
            {masterAppList.map((app) => (
              <Grid2
                key={app.id}
                size={{ xs: 4, md: 1 }}
                data-testid={`AppList-List__${app.id}_Wrapper`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AllAppButton
                  label={app.label}
                  path={app.path}
                  icon={app.icon as JSX.Element}
                  disabled={app.disabled ?? false}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Grow>
    </Modal>
  );
};

//Modal BoxShadow
// boxShadow:
//   'inset 0 4px 10px rgba(255, 255, 255, 0.1), inset 0 -6px 15px rgba(0, 0, 0, 0.4), inset 10px 10px 20px rgba(0, 0, 0, 0.25), inset -10px -10px 20px rgba(255, 255, 255, 0.2)',
