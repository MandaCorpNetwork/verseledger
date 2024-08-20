import { Box, TextField } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { createUserTokens } from '@Redux/Slices/Tokens/Actions/createUserToken';
import React, { useState } from 'react';

import { POPUP_SHOW_TOKEN } from './ShowToken';

export const POPUP_CREATE_TOKEN = 'CreateToken';

export const CreateTokenPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState(false);
  const [name, setName] = useState<string>();
  return (
    <VLPopup
      name={POPUP_CREATE_TOKEN}
      data-testid={`CreateToken`}
      title={'Create API Token'}
      onClose={() => {
        dispatch(closePopup(POPUP_CREATE_TOKEN));
      }}
      submitDisabled={pending || (name?.length ?? 0) <= 3}
      onSubmit={() => {
        setPending(true);
        dispatch(createUserTokens({ name: name as string, expires: '1y' })).then((r) => {
          if (r.meta.requestStatus == 'fulfilled') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch(openPopup(POPUP_SHOW_TOKEN, { token: (r.payload as any).token }));
            dispatch(closePopup(POPUP_CREATE_TOKEN));
          }
        });
      }}
      onCancel={() => {
        dispatch(closePopup(POPUP_CREATE_TOKEN));
      }}
    >
      <Box>
        <TextField
          variant="outlined"
          placeholder="Token Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        ></TextField>
      </Box>
    </VLPopup>
  );
};
