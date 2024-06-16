import { Box, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React, { useCallback } from 'react';

export const POPUP_YOU_SURE = 'youSure';

export type YouSurePopupProps = {
  title: string;
  acceptText: string;
  onAccept?: () => void;
  cancelText: string;
  onCancel?: () => void;
  clickaway?: boolean;
  subjectText: string;
  bodyText: string;
  ['data-testid']?: string;
};

export const YouSurePopup: React.FC<YouSurePopupProps> = (props) => {
  const {
    title,
    acceptText = `I'm Sure`,
    onAccept,
    cancelText = 'Nevermind',
    onCancel,
    clickaway = false,
    subjectText,
    bodyText,
    'data-testid': testid = 'verify',
  } = props;
  const dispatch = useAppDispatch();
  const onCancelDefault = useCallback(() => {
    dispatch(closePopup(POPUP_YOU_SURE));
  }, []);
  const onAcceptInject = useCallback(() => {
    dispatch(closePopup(POPUP_YOU_SURE));
    onAccept?.();
  }, []);
  return (
    <VLPopup
      name={POPUP_YOU_SURE}
      data-testid={`YouSurePopup__${testid}`}
      title={title}
      onClose={() => clickaway}
      submitText={acceptText}
      onSubmit={onAcceptInject}
      cancelText={cancelText}
      onCancel={onCancel ?? onCancelDefault}
    >
      <Box>
        <Typography variant="subtitle1" align="center" sx={{ color: 'info.main' }}>
          Are you sure you want to cancel {subjectText}?
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: 'info.main' }}>
          {bodyText}
        </Typography>
      </Box>
    </VLPopup>
  );
};
