import { masterAppList } from '@Common/Definitions/Apps';
import { Close } from '@mui/icons-material';
import { Grid2, IconButton, Modal, Typography } from '@mui/material';
import React from 'react';

import { AppIcon } from '../Icons/AppIcon';

export const POPUP_APP_LIST = 'appList';

const AllAppsComponent: React.FC = () => {
  return (
    <Modal open={true} data-popupState={0}>
      <Typography>App List</Typography>
      <IconButton>
        <Close />
      </IconButton>
      <Grid2 container spacing={2}>
        {masterAppList.map((app) => (
            <Grid2>>
          <AppIcon
            key={app.id
            label={app.label}
            path={app.path}
            icon={app.icon as JSX.Element}
            disabled={app.disabled ?? false}
          />
        ))}
      </Grid2>
    </Modal>
  );
};

export const AllApps = React.memo(AllAppsComponent);
