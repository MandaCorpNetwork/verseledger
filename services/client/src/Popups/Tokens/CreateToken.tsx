import { Box, FormGroup, TextField, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { createUserTokens } from '@Redux/Slices/Tokens/Actions/createUserToken';
import React, { useState } from 'react';
import { ApiPermission } from 'vl-shared/src/enum/ApiPermission';

import { PermissionGroup } from './PermissionGroup';
import { POPUP_SHOW_TOKEN } from './ShowToken';

export const POPUP_CREATE_TOKEN = 'CreateToken';

export const CreateTokenPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState(false);
  const [name, setName] = useState<string>();
  const roleState = useState<Set<ApiPermission>>(new Set([ApiPermission.USER_READ]));
  return (
    <VLPopup
      name={POPUP_CREATE_TOKEN}
      data-testid={`CreateToken`}
      minWidth="80%"
      title={'Create API Token'}
      onClose={() => {
        dispatch(closePopup(POPUP_CREATE_TOKEN));
      }}
      submitDisabled={pending || (name?.length ?? 0) <= 3}
      onSubmit={() => {
        setPending(true);
        dispatch(
          createUserTokens({
            name: name as string,
            expires: '1y',
            roles: Array.from(roleState[0]),
          }),
        ).then((r) => {
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
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5">Permissions</Typography>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            title="User"
            description="View and Manage a user's profile."
            disableNone
            read={ApiPermission.USER_READ}
            write={ApiPermission.USER}
            rolesState={roleState}
          />
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            title="User Settings"
            description="Manage a user's account settings."
            read={ApiPermission.USERSETTINGS_READ}
            write={ApiPermission.USERSETTINGS}
            rolesState={roleState}
          />
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            title="Notifications"
            description="Manage user notifications"
            read={ApiPermission.NOTIFICATIONS_READ}
            write={ApiPermission.NOTIFICATIONS}
            rolesState={roleState}
          />
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            title="Contracts"
            description="Manage and Create Contracts"
            read={ApiPermission.CONTRACT_READ}
            write={ApiPermission.CONTRACT}
            rolesState={roleState}
          />
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            title="Bids"
            description="Manage and Create Bids"
            read={ApiPermission.BID_READ}
            write={ApiPermission.BID}
            rolesState={roleState}
          />
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            title="Ratings"
            description="Manage and Create Ratings"
            read={ApiPermission.RATING_READ}
            write={ApiPermission.RATING}
            rolesState={roleState}
          />
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            privilaged
            writePrivilaged
            title="Chat"
            description="View chat messages"
            read={ApiPermission.CHAT_READ}
            write={ApiPermission.CHAT}
            rolesState={roleState}
          />
        </FormGroup>
        <FormGroup sx={{ width: '100%' }}>
          <PermissionGroup
            privilaged
            writePrivilaged
            title="API Tokens"
            description="View and Revoke API Tokens"
            read={ApiPermission.TOKEN_READ}
            write={ApiPermission.TOKEN}
            rolesState={roleState}
          />
        </FormGroup>
      </Box>
    </VLPopup>
  );
};
