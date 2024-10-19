import { LoginTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { POPUP_LOGIN } from '@Popups/Login/LoginPopup';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

export const LoginIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Box className="Swap-Icon-Container" onClick={() => dispatch(openPopup(POPUP_LOGIN))}>
      <LoginTwoTone className="Login-Icon" fontSize="large" />
      <LoginTwoTone className="Login-Reflection" fontSize="large" />
    </Box>
  );
};
