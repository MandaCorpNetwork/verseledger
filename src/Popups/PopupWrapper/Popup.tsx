import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React, { PropsWithChildren, useCallback } from 'react';

type VLPopupProps = PropsWithChildren<{
  title: string;
  submitText?: string;
  submitDisabled?: boolean;
  onSubmit?: () => void;
  cancelText?: string;
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
    'data-testid': testid,
    onClose,
    name,
  } = props;
  const dispatch = useAppDispatch();
  const onCloseDefault = useCallback(() => {
    dispatch(closePopup(name));
  }, []);
  return (
    <Dialog
      open={true}
      sx={{ backdropFilter: 'blur(10px)' }}
      data-testid={`VLPopup__${testid}__Root`}
      data-popupstate={state}
      onClose={onClose ?? onCloseDefault}
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
            color="secondary"
            disabled={cancelDisabled}
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        )}
        {onSubmit && (
          <Button
            data-testid={`VLPopup__${testid}__Submit`}
            variant="contained"
            color="secondary"
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
