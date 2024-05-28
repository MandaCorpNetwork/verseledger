import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { Box } from '@mui/material';
import React from 'react';

export const POPUP_PAY_STRUCTURES = 'payStructures';

export const PayStructuresPopup = (React.FC = () => {
  return (
    <VLPopup name={POPUP_PAY_STRUCTURES} title="Pay Structures">
      <Box>Whatdya know</Box>
    </VLPopup>
  );
});
