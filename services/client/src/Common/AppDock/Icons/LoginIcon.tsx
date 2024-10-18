import { PersonOutlineTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { POPUP_LOGIN } from '@Popups/Login/LoginPopup';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';

export const LoginIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Box className="Swap-Icon-Container" onClick={() => dispatch(openPopup(POPUP_LOGIN))}>
      <PersonOutlineTwoTone className="Login-Icon" fontSize="large" />
      <PersonOutlineTwoTone className="Login-Reflection" fontSize="large" />
    </Box>
  );
};
