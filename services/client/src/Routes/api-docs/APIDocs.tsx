import 'swagger-ui-react/swagger-ui.css';

import { Box } from '@mui/material';
import { AuthUtil } from '@Utils/AuthUtil';
import { URLUtil } from '@Utils/URLUtil';
import React from 'react';
import SwaggerUI from 'swagger-ui-react';

export const APIDocs: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFF' }}>
      <SwaggerUI
        url={`${URLUtil.backendHost}/api-docs/swagger.json`}
        requestSnippetsEnabled={true}
        onComplete={(swagger) => {
          const token = AuthUtil.getAccessToken();
          if (token == null) return;
          swagger.preauthorizeApiKey('VLBearerAuth', `Bearer ${token}`);
        }}
      />
    </Box>
  );
};
