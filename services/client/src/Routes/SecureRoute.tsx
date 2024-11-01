import Error from '@Assets/media/error.gif';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_LOGIN } from '@Popups/Login/LoginPopup';
import { POPUP_VERIFY_USER } from '@Popups/VerifyPopup/VerifyUser';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/auth.selectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React, { PropsWithChildren } from 'react';

type SecureRouteProps = {
  allowUnverified?: boolean;
};
export const SecureRoute: React.FC<PropsWithChildren<SecureRouteProps>> = (props) => {
  const { children, allowUnverified } = props;
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  if (currentUser == null || (!currentUser.verified && !allowUnverified))
    return (
      <Box style={{ minHeight: '100vh', padding: '2em' }}>
        <Typography variant="h1" align="center">
          Restricted
        </Typography>
        <Typography align="center" sx={{ mb: '5em' }}>
          You lack the proper access level to reach this area!
        </Typography>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            mt: '2em',
          }}
        >
          <Box
            sx={{
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderRadius: '10px',
              overflow: 'hidden',
              borderColor: 'primary.main',
              position: 'relative',
            }}
          >
            <img src={Error} alt="Error.gif" />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'rgba(0,20,100,.6)',
                padding: '.5em',
                borderRight: '2px solid',
                borderLeft: '2px solid',
                borderRadius: '5px',
                borderColor: 'secondary.main',
                overflow: 'hidden',
                maxWidth: '100%',
                textAlign: 'center',
              }}
            >
              <Typography variant="subtitle1">
                {currentUser?.verified === false ? (
                  <Button
                    variant="popupButton"
                    onClick={() => dispatch(openPopup(POPUP_VERIFY_USER))}
                  >
                    Verify RSI Account
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(openPopup(POPUP_LOGIN));
                    }}
                    color="secondary"
                  >
                    Login to Continue
                  </Button>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  return children;
};
