import { Typography } from '@mui/material';
import React from 'react';

export const MemberManagement: React.FC = () => {
  return (
    <div
      data-testid="OrgManager-PanelDisplay-Rank&Roles-Panel__MemberManagement_Wrapper"
      style={{ flexGrow: 1 }}
    >
      <div
        data-testid="OrgManager-PanelDisplay-MemberManagement__Title_Wrapper"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography
          data-testid="OrgManager-PanelDisplay-MemberManagement__Title"
          variant="h4"
          sx={{
            color: 'text.secondary',
            textShadow: '2px 2px 4px rgba(255,255,255,0.3)',
          }}
        >
          Manage Organization Members
        </Typography>
        <Typography
          data-testid="OrgManager-PanelDisplay-MemberManagement-Title__Description"
          variant="subtitle1"
          sx={{
            color: 'info.main',
            textShadow: '2px 2px 2px rgba(0,0,0,0.8)',
          }}
        >
          Check Join Requests, Invites, & Manage Member Information
        </Typography>
      </div>
    </div>
  );
};
