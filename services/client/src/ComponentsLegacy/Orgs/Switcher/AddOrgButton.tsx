import { GroupAddTwoTone } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';
import { POPUP_ADD_ORG } from '@Popups/Orgs/AddOrg/AddOrg';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

export const AddOrgButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(openPopup(POPUP_ADD_ORG));
  }, [dispatch]);
  return (
    <ButtonBase
      onClick={handleClick}
      sx={{
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'rgba(0,0,0)',
        backgroundImage: 'linear-gradient(120deg, rgba(120,120,120), rgba(60,60,60))',
        boxShadow:
          'inset 0 2px 5px rgba(255, 255, 255, 0.3), inset 0 -2px 5px rgba(0, 0, 0, 0.4), 0px 4px 8px rgba(0, 0, 0, 0.3)',
        opacity: '0.8',
      }}
    >
      <GroupAddTwoTone fontSize="large" color="success" />
    </ButtonBase>
  );
};
