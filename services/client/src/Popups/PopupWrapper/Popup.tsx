import { useSoundEffect } from '@Audio/AudioManager';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React, { type PropsWithChildren, type ReactElement, useCallback } from 'react';

export type TitleWithObject = {
  text: string;
  object: React.ReactNode;
};

type VLPopupProps = PropsWithChildren<{
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  title: string | TitleWithObject;
  submitButton?: ReactElement;
  auxSubmitButton?: ReactElement;
  cancelButton?: ReactElement;
  auxCancelButton?: ReactElement;
  alertBox?: ReactElement;
  submitText?: string | React.ReactNode;
  submitDisabled?: boolean;
  onSubmit?: () => void;
  cancelText?: string | React.ReactNode;
  cancelDisabled?: boolean;
  onCancel?: () => void;
  onClose?: () => boolean | void;
  state?: string | number;
  ['data-testid']?: string;
  open?: boolean;
  name: string;
  bottomBarComponent?: React.ReactNode;
  sx?: object;
}>;

const VLPopupComponent: React.FC<VLPopupProps> = (props) => {
  const {
    children,
    title,
    onSubmit,
    onCancel,
    submitDisabled = false,
    cancelDisabled = false,
    submitText = 'Submit',
    cancelText = 'Cancel',
    state = 0,
    'data-testid': testid = 'form',
    onClose,
    name,
    minWidth,
    bottomBarComponent,
    maxWidth,
    minHeight,
    maxHeight,
    submitButton,
    auxSubmitButton,
    cancelButton,
    auxCancelButton,
    alertBox,
    sx,
  } = props;
  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const onCloseDefault = useCallback(() => {
    sound.playSound('close');
    dispatch(closePopup(name));
  }, [dispatch, name, sound]);
  return (
    <Dialog
      open={true}
      data-testid={`VLPopup__${testid}__Root`}
      data-popupstate={state}
      onClose={onClose ?? onCloseDefault}
      sx={{
        backdropFilter: 'blur(10px)',
      }}
      PaperProps={{
        sx: {
          bgcolor: 'rgba(8, 29, 68, 0.6)',
          display: 'flex',
          padding: { xs: '0', md: '1em' },
          borderRadius: '10px',
          flexDirection: 'column',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          overflow: 'hidden',
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
          ...sx,
        },
      }}
    >
      <DialogTitle
        variant="h5"
        data-testid={`VLPopup__${testid}__Title`}
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      >
        {typeof title === 'string' ? (
          title
        ) : (
          <>
            {title.text}
            {title.object}
          </>
        )}
        {!onSubmit && (
          <IconButton onClick={onCloseDefault} sx={{ ml: 'auto' }}>
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent
        data-testid={`VLPopup__${testid}__Content`}
        sx={{ overflow: 'hidden' }}
      >
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {alertBox}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexGrow: 1,
            gap: '0.5em',
          }}
        >
          {auxCancelButton}
          {cancelButton}
          {auxSubmitButton}
          {submitButton}
        </Box>
      </DialogActions>
      <DialogActions>
        {bottomBarComponent && <>{bottomBarComponent}</>}
        {onCancel && (
          <Button
            data-testid={`VLPopup__${testid}__Cancel`}
            variant="popupButton"
            disabled={cancelDisabled}
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        )}
        {onSubmit && (
          <Button
            data-testid={`VLPopup__${testid}__Submit`}
            variant="popupButton"
            disabled={submitDisabled}
            onClick={onSubmit}
          >
            {submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export const VLPopup = React.memo(VLPopupComponent);
