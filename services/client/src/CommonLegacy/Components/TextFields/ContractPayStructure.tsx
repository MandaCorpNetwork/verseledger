import { HelpOutline } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { POPUP_PAY_STRUCTURES } from '@Popups/Info/PayStructures';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import type React from 'react';

type ContractPayStructureProps = {
  payStructure: string;
  maxWidth?: string;
};

export const ContractPayStructureLabel: React.FC<ContractPayStructureProps> = ({
  payStructure,
  maxWidth,
}) => {
  const dispatch = useAppDispatch();
  // Handler to open PayStructure Info Popup
  const handlePayStructurePopup = () => {
    dispatch(openPopup(POPUP_PAY_STRUCTURES));
  };
  return (
    <>
      <TextField
        data-testid="PayStructureLabel"
        size="small"
        label="Pay Structure"
        value={payStructure.charAt(0) + payStructure.slice(1).toLowerCase()}
        color="secondary"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handlePayStructurePopup}>
              <HelpOutline color="info" fontSize="small" />
            </InputAdornment>
          ),
          sx: {
            cursor: 'default',
          },
        }}
        inputProps={{
          readOnly: true,
          style: {
            cursor: 'default',
          },
        }}
        margin="dense"
        sx={{
          maxWidth: maxWidth,
        }}
      />
    </>
  );
};
