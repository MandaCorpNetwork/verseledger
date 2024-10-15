import { LocationSearch } from '@Common/Components/App/LocationSearch';
import { Box } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const POPUP_ADD_LOCATION = 'add_location';

export type AddLocationProps = {
  onLocationSelection: (location: ILocation | null) => void;
};

export const AddLocationPopup: React.FC<AddLocationProps> = ({ onLocationSelection }) => {
  return (
    <VLPopup data-testid="AddLocation" name={POPUP_ADD_LOCATION} title="Add Location">
      <Box sx={{ py: '1em' }}>
        <LocationSearch onLocationSelect={onLocationSelection} />
      </Box>
    </VLPopup>
  );
};
