import { LoadingWheel } from '@Common/LoadingObject/LoadingWheel';
import { Button, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { getLoginMethods } from '@Redux/Slices/Auth/Actions/getLoginMethods.action';
import React, { useEffect, useState } from 'react';

export const POPUP_LOGIN = 'POPUP_LOGIN';

export const LoginPopup: React.FC = () => {
  const [loginMethods, setLoginMethods] =
    useState<{ type: string; redirect: string }[]>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLoginMethods()).then((response) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLoginMethods((response.payload as any).data);
    });
  }, [dispatch]);

  const onClick = React.useCallback(() => {
    localStorage.setItem('returnPath', window.location.pathname);
  }, []);
  return (
    <VLPopup name={POPUP_LOGIN} title="Login" data-testid="Login" sx={{ p: '1em' }}>
      <div
        style={{ padding: '1em', display: 'flex', flexDirection: 'column', gap: '1em' }}
      >
        {' '}
        {loginMethods != null ? (
          loginMethods.map((method) => {
            return (
              <Button
                key={method.type}
                variant="popupButton"
                onClick={onClick}
                href={method.redirect}
              >
                Login with {method.type}
              </Button>
            );
          })
        ) : (
          <LoadingWheel />
        )}
        <Typography variant="tip" px="1em">
          We do not store any of your personal information.
        </Typography>
        <Typography variant="tip" px="1em">
          Each login method will create a separate account, and an RSI account may only be
          linked to <strong>ONE</strong> VerseLedger account at a time.
        </Typography>
      </div>
    </VLPopup>
  );
};
