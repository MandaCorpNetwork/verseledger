import { Button, TextField, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppDispatch } from '@Redux/hooks';
import { closePopup, openPopup } from '@Redux/Slices/Popups/popups.actions';
import { useNav } from '@Utils/Hooks/useNav';
import React from 'react';

import { POPUP_CREATE_ORG } from '../CreateOrg/CreateOrg';

export const POPUP_ADD_ORG = 'addOrg';

export const AddOrgPopup: React.FC = () => {
  const nav = useNav();
  const dispatch = useAppDispatch();

  const handleSearch = React.useCallback(
    (e: React.MouseEvent) => {
      const url = `/orgs/finder`;
      dispatch(closePopup(POPUP_ADD_ORG));
      nav(url, 'internal', true).onClick(e);
    },
    [dispatch, nav],
  );

  const handleCreate = React.useCallback(() => {
    dispatch(closePopup(POPUP_ADD_ORG));
    dispatch(openPopup(POPUP_CREATE_ORG));
  }, [dispatch]);
  return (
    <VLPopup name={POPUP_ADD_ORG} title="Add Organization">
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1em', padding: '1em' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            align="center"
            marginBottom="2px"
          >
            Add From Invite:
          </Typography>
          <TextField
            label="Invite Link"
            size="small"
            color="secondary"
            disabled
            sx={{ mb: '0.5em' }}
          />
          <Button variant="contained" disabled>
            Open Invites
          </Button>
        </div>
        <Button variant="contained" color="info" onClick={handleSearch}>
          Search Orgs
        </Button>
        <Button variant="contained" color="success" onClick={handleCreate}>
          Create Org
        </Button>
      </div>
    </VLPopup>
  );
};
