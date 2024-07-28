import { HelpOutline } from '@mui/icons-material';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

import { DigiField } from './DigiField';

type PayStructureProps = {
  payStructure: string;
  maxWidth?: string;
  testid?: string;
  width?: string;
};

const PayStructureLabel: React.FC<PayStructureProps> = ({
  payStructure,
  maxWidth,
  testid,
  width,
}) => {
  const dispatch = useAppDispatch();
  // Handler to open PayStructure Info Popup
  const handlePayStructurePopup = () => {
    dispatch(openPopup(POPUP_PAY_STRUCTURES));
  };
  return (
    <DigiField
      data-testid={testid}
      label="Pay Structure"
      endAdornment={
        <HelpOutline
          fontSize="small"
          onClick={handlePayStructurePopup}
          sx={{ cursor: 'pointer', color: 'info.main' }}
        />
      }
      sx={{
        maxWidth: maxWidth,
        width: width,
      }}
    >
      {payStructure.charAt(0) + payStructure.slice(1).toLowerCase()}
    </DigiField>
  );
};

export const PayStructure = React.memo(PayStructureLabel);
