import { useSoundEffect } from '@Audio/AudioManager';
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
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const onCancelDefault = useCallback(() => {
    sound.playSound('warning');
    dispatch(closePopup(POPUP_YOU_SURE));
  }, [dispatch, sound]);
  const onAcceptInject = useCallback(() => {
    sound.playSound('close');
    dispatch(closePopup(POPUP_YOU_SURE));
    onAccept?.();
  }, [dispatch, onAccept, sound]);
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
          {subjectText}?
        </Typography>
        <Typography variant="tip" align="center" sx={{ color: 'info.main', px: '1em' }}>
          {bodyText}
        </Typography>
      </Box>
    </VLPopup>
  );
};
