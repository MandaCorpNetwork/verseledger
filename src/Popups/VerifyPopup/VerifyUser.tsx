import { LoadingWheel } from '@Common/LoadingObject/LoadingWheel';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { fetchCheckVerificationCode } from '@Redux/Slices/Auth/Actions/checkVerificationCode';
import { fetchCreateVerificationCode } from '@Redux/Slices/Auth/Actions/createVerificationCode';
import { fetchDeleteVerificationCode } from '@Redux/Slices/Auth/Actions/deleteVerificationCode';
import { fetchVerificationCode } from '@Redux/Slices/Auth/Actions/fetchVerificationCode';
import { closePopup } from '@Redux/Slices/Popups/popups.actions';
import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '../../Redux/hooks';

export const POPUP_VERIFY_USER = 'verifyCard';

export type VerifyUserPopupProps = {
  userid: string;
};

export const VerifyUserPopup: React.FC = () => {
  const [verificationInfo, setVerificationInfo] = useState<UserVerification | null>(null);
  const [error, setError] = useState('');
  const [popupState, setPopupState] = useState<'checking' | 'validate' | 'createToken'>(
    'checking',
  );
  const dispatch = useAppDispatch();
  console.log(verificationInfo);
  useEffect(() => {
    dispatch(fetchVerificationCode()).then((r) => {
      if (r.type.endsWith('/rejected')) {
        setPopupState('createToken');
      } else {
        setVerificationInfo(r.payload as UserVerification);
        setPopupState('validate');
      }
    });
  }, []);

  const [rsiHandleInput, setRsiHandleInput] = useState('');

  const createToken = useCallback(() => {
    setPopupState('checking');
    dispatch(fetchCreateVerificationCode(rsiHandleInput)).then((r) => {
      if (r.type.endsWith('/rejected')) {
        setPopupState('createToken');
        setError('Invalid RSI Token');
      } else {
        setVerificationInfo(r.payload as UserVerification);
        setPopupState('validate');
      }
    });
  }, [rsiHandleInput]);

  return (
    <VLPopup
      name={POPUP_VERIFY_USER}
      title="Verify Account Ownership"
      data-testid="VerifyCard"
    >
      {popupState === 'checking' && (
        <Box sx={{ display: 'flex', width: '100%', height: '200px', margin: 'auto' }}>
          <LoadingWheel />
        </Box>
      )}
      {popupState === 'createToken' && (
        <FormControl sx={{ width: '100%' }}>
          <TextField
            sx={{ mt: '1em' }}
            fullWidth
            variant="outlined"
            error={error != ''}
            helperText={error != '' ? error : undefined}
            label="RSI Handle"
            value={rsiHandleInput}
            onChange={(e) => {
              setRsiHandleInput(e.currentTarget.value);
            }}
          />
          <Button
            disabled={rsiHandleInput.trim() == ''}
            sx={{ mt: '2em' }}
            variant="popupButton"
            onClick={createToken}
          >
            Generate Verification Code
          </Button>
        </FormControl>
      )}
      {popupState === 'validate' && verificationInfo != null && (
        <FormControl sx={{ width: '100%' }}>
          <Box display="flex" sx={{ mt: '1em' }}>
            <Avatar
              sx={{ m: 'auto', ml: '0.5em', mr: '0.5em' }}
              src={verificationInfo.pfp}
            />
            <TextField
              fullWidth
              disabled
              variant="outlined"
              label="RSI Handle"
              value={verificationInfo.handle}
            />
          </Box>
          <Button
            sx={{
              color: 'red',
              mt: '0.5em',
            }}
            variant="outlined"
            onClick={() => {
              dispatch(fetchDeleteVerificationCode()).then(() => {
                setVerificationInfo(null);
                setPopupState('createToken');
              });
            }}
          >
            Not You? Change RSI Handle
          </Button>
          <Typography sx={{ mt: '1em' }}>
            Please add the following code to your{' '}
            <Link
              sx={{ color: 'text.secondary' }}
              rel="noopener noreferrer"
              href="https://robertsspaceindustries.com/account/profile"
              target="_blank"
            >
              RSI Short Bio
            </Link>
            .
          </Typography>
          <Typography variant="subtitle2">
            You can delete it after you are verified.
          </Typography>
          <Typography variant="subtitle2">
            This code will only be valid for 5 minutes.
          </Typography>
          <TextField value={verificationInfo.id} />
          <Button
            sx={{ mt: '1em' }}
            variant="popupButton"
            onClick={() => {
              setPopupState('checking');
              dispatch(fetchCheckVerificationCode()).then((r) => {
                if (r.type.endsWith('/rejected')) {
                  setPopupState('validate');
                } else {
                  dispatch(closePopup(POPUP_VERIFY_USER));
                }
              });
            }}
          >
            I have added the token to my Bio
          </Button>
        </FormControl>
      )}
    </VLPopup>
  );
};
