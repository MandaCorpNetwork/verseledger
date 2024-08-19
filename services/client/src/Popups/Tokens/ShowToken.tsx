import { Box, Button, TextField, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

export const POPUP_SHOW_TOKEN = 'ShowToken';
export type ShowTokenPopupProps = { token: string };
export const ShowTokenPopup: React.FC<ShowTokenPopupProps> = (props) => {
  const { token } = props;
  const dispatch = useAppDispatch();
  return (
    <VLPopup
      name={POPUP_SHOW_TOKEN}
      data-testid={`ShowToken`}
      title={'New API Token'}
      onSubmit={() => {
        dispatch(closePopup(POPUP_SHOW_TOKEN));
      }}
      submitText="I have copied the token"
    >
      <Box>
        <TextField
          InputProps={{ readOnly: true }}
          value={token}
          sx={{ width: '100%' }}
        ></TextField>
        <Typography
          variant="tip"
          align="center"
          sx={{ color: 'info.main', width: '100%' }}
        >
          Once you close this popup there is NO WAY to get this token again.
        </Typography>
        <Button
          variant="popupButton"
          sx={{ width: '100%' }}
          onClick={() => {
            navigator.clipboard.writeText(token);
            enqueueSnackbar('Copied to Clipboard', { variant: 'success' });
          }}
        >
          Copy to Clipboard
        </Button>
      </Box>
    </VLPopup>
  );
};
