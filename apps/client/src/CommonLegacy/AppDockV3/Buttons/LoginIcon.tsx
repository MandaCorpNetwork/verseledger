import '@Assets/Css/AppDockV3.css';

import { LoginTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { POPUP_LOGIN } from '@Popups/Login/LoginPopup';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import type React from 'react';

export const LoginIcon: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Box
      data-testid="AppDock__UserState_Button"
      id="AppDock__UserState_Button"
      className="AppIconContainer Login"
      onClick={() => dispatch(openPopup(POPUP_LOGIN))}
    >
      <LoginTwoTone
        data-testid="AppDock__Login_Icon"
        className="AdvAppIcon DockFunctionIcon DockFunctionIconMedAnimation"
        fontSize="large"
      />
      <LoginTwoTone
        data-testid="AppDock__Login_IconReflection"
        className="DockFunctionReflection DockFunctionIconMedAnimation"
        fontSize="large"
      />
    </Box>
  );
};
