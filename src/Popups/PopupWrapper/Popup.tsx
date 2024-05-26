import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React, { PropsWithChildren, useCallback } from 'react';

type VLPopupProps = PropsWithChildren<{
  minWidth?: string;
  maxWidth?: string;
  title: string;
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
  } = props;
  const dispatch = useAppDispatch();
  const onCloseDefault = useCallback(() => {
    dispatch(closePopup(name));
  }, []);
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
          padding: '2em',
          borderRadius: '10px',
          flexDirection: 'column',
          borderTop: '2px solid',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          minWidth,
        },
      }}
    >
      <DialogTitle variant="h5" data-testid={`VLPopup__${testid}__Title`}>
        {title}
      </DialogTitle>
      <DialogContent data-testid={`VLPopup__${testid}__Content`}>
        {children}
      </DialogContent>
      <DialogActions>
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
