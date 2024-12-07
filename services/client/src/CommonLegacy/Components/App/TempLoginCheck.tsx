import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchCurrentUser } from '@Redux/Slices/Auth/Actions/fetchCurrentUser.action';
import { fetchUserSettings } from '@Redux/Slices/Auth/Actions/fetchUserSettings.action';
import { selectIsLoggedIn } from '@Redux/Slices/Auth/auth.selectors';
import { fetchUserFlags } from '@Redux/Slices/Flags/Actions/fetchFlags.action';
import { AuthUtil } from '@Utils/AuthUtil';
import React from 'react';

export const LoginCheck: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  React.useEffect(() => {
    if (isLoggedIn) return;
    const accessToken = AuthUtil.getAccessToken();
    if (AuthUtil.isValidToken(accessToken)) {
      dispatch(fetchCurrentUser());
      dispatch(fetchUserFlags());
    }
  });
  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserSettings());
    }
  }, [dispatch, isLoggedIn]);
  return (
    <Box
      sx={{
        display: 'none',
        zIndex: -500,
        position: 'absolute',
        top: 0,
        height: '1px',
        width: '1px',
      }}
    />
  );
};
