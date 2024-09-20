import '@scalar/api-reference-react/style.css';

import { Box } from '@mui/material';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import { URLUtil } from '@Utils/URLUtil';
import React from 'react';

export const APIDocs: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFF' }}>
      <ApiReferenceReact
        configuration={{
          spec: { url: `${URLUtil.backendHost}/api-docs/swagger.json` },
          theme: 'purple',
          hideDarkModeToggle: true,
          hideTestRequestButton: true,
        }}
      />
    </Box>
  );
};
