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
  type SxProps,
  useTheme,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import { useDynamicTheme } from '@Utils/Hooks/useDynamicTheme';
import React, {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

export type TitleWithObject = {
  text: string;
  object: React.ReactElement;
};

type VLPopupProps = PropsWithChildren<{
  title: string | TitleWithObject;
  submitButton?: ReactElement;
  auxSubmitButton?: ReactElement;
  cancelButton?: ReactElement;
  auxCancelButton?: ReactElement;
  alertBox?: ReactElement;
  submitText?: string | ReactNode;
  submitDisabled?: boolean;
  onSubmit?: () => void;
  cancelText?: string | ReactNode;
  cancelDisabled?: boolean;
  onCancel?: () => void;
  onClose?: () => void;
  state?: string | number;
  ['data-testid']?: string;
  name: string;
  bottomBarComponent?: ReactNode;
  sx?: SxProps<Theme>;
}>;

/**
 * Popup Component that Wraps all Popups in the Application.
 */

const VLPopupComponent: React.FC<VLPopupProps> = (props) => {
  const {
    children,
    title,
    onSubmit,
    onCancel,
    submitDisabled = false,
    cancelDisabled = false,
    submitText = '@UI.SUBMIT',
    cancelText = '@UI.CANCEL',
    state = 0,
    'data-testid': testId = 'form',
    onClose,
    name,
    bottomBarComponent,
    submitButton,
    auxSubmitButton,
    cancelButton,
    auxCancelButton,
    alertBox,
    sx,
  } = props;

  const dispatch = useAppDispatch();
  const sound = useSoundEffect();
  const extendTheme = useDynamicTheme();
  const theme = useTheme();
  const { t } = useTranslation();

  const onCloseDefault = useCallback(() => {
    sound.playSound('close');
    dispatch(closePopup(name));
  }, [dispatch, name, sound]);

  const backdropFilter = useMemo(() => {
    if (theme.fidelity === 'high') return `blur(10px)`;
    return `none`;
  }, [theme.fidelity]);

  const layout = useMemo(() => {
    const popup = extendTheme.layout('Popup.Dialog');
    const title = extendTheme.layout('Popup.Title');
    const closeIconButton = extendTheme.layout('Popup.CloseIcon');
    const contentContainer = extendTheme.layout('Popup.Content');
    const buttonContainer = extendTheme.layout('Popup.ButtonContainer');

    const popupOverwrite = {
      ...popup,
      ...sx,
    };

    return { popupOverwrite, title, closeIconButton, contentContainer, buttonContainer };
  }, [extendTheme, sx]);

  return (
    <Dialog
      open={true}
      data-testid={`VLPopup__${testId}__Root`}
      data-popupstate={state}
      onClose={onClose ?? onCloseDefault}
      sx={{
        backdropFilter: backdropFilter,
        ...layout.popupOverwrite,
      }}
    >
      <DialogTitle
        variant="h5"
        data-testid={`VLPopup__${testId}__Title`}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          ...layout.title,
        }}
      >
        {typeof title === 'string' ? (
          t(title)
        ) : (
          <>
            {title.text}
            {title.object}
          </>
        )}
        {!onSubmit && (
          <IconButton
            data-testid={`VLPopup__${testId}__CloseButton`}
            aria-label="Close Popup Button"
            onClick={onCloseDefault}
            sx={{ ml: 'auto', ...layout.closeIconButton }}
          >
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent
        data-testid={`VLPopup__${testId}__Content`}
        sx={{ overflow: 'hidden', ...layout.contentContainer }}
      >
        {children}
      </DialogContent>
      {bottomBarComponent ?? (
        <DialogActions
          data-testid={`VLPopup__${testId}__Actions`}
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {alertBox}
          <Box
            data-testid={`VLPopup__${testId}-Actions__ButtonWrapper`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexGrow: 1,
              gap: '0.5em',
              ...layout.buttonContainer,
            }}
          >
            {auxCancelButton}
            {onCancel && (
              <>
                {cancelButton ?? (
                  <Button
                    data-testid={`VLPopup__${testId}__CancelButton`}
                    variant="popupButton"
                    disabled={cancelDisabled}
                    onClick={onCancel}
                  >
                    {typeof cancelText === 'string' ? t(cancelText) : submitText}
                  </Button>
                )}
              </>
            )}
            {auxSubmitButton}
            {onSubmit && (
              <>
                {submitButton ?? (
                  <Button
                    data-testid={`VLPopup__${testId}__SubmitButton`}
                    variant="popupButton"
                    disabled={submitDisabled}
                    onClick={onSubmit}
                  >
                    {typeof submitText === 'string' ? t(submitText) : submitText}
                  </Button>
                )}
              </>
            )}
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};

export const VLPopup = React.memo(VLPopupComponent);
